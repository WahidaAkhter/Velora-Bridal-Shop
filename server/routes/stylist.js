import express from 'express';
import { getDB } from '../data/store.js';

const router = express.Router();
const requestWindows = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  if (requestWindows.size > 1000) {
    for (const [address, entry] of requestWindows) {
      if (now - entry.startedAt >= 60_000) requestWindows.delete(address);
    }
  }
  const window = requestWindows.get(ip);
  if (!window || now - window.startedAt >= 60_000) {
    requestWindows.set(ip, { startedAt: now, count: 1 });
    return false;
  }
  window.count += 1;
  return window.count > 12;
}

const stylistInstructions = `You are the VELORA Atelier bridal concierge. Speak with the polished, attentive tone of an experienced luxury bridal stylist: warm, clear, composed, and specific. Avoid pet names, gushy language, exclamation marks, emojis, filler, and generic advice. Answer the customer's question first, then give up to three useful next steps. Keep replies under 110 words unless the customer asks for a detailed plan. Ask at most one focused follow-up question. Use the supplied site information for VELORA-specific recommendations; never invent gown names, prices, stock, delivery dates, store policies, customisation options, or services. If the answer is not in the supplied information, say what needs confirming with the boutique. Be body-positive and treat silhouette suggestions as optional starting points. Do not provide medical, legal, or financial advice.`;

router.post('/chat', async (req, res) => {
  if (isRateLimited(req.ip)) {
    return res.status(429).json({ error: 'Please take a moment before sending another message.' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'OpenRouter is not configured.' });
  }

  const messages = req.body?.messages;
  const page = typeof req.body?.page === 'string' ? req.body.page.slice(0, 160) : '/';
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 10) {
    return res.status(400).json({ error: 'Please send up to 10 recent messages.' });
  }

  const input = messages.map((message) => {
    if (!['user', 'assistant'].includes(message?.role) || typeof message?.content !== 'string') return null;
    const content = message.content.trim();
    if (!content || content.length > 1000) return null;
    return { role: message.role, content };
  });
  if (input.some((message) => !message)) {
    return res.status(400).json({ error: 'Messages must contain valid text.' });
  }

  try {
    const db = getDB();
    const catalog = (db.products || []).map((gown) => ({
      name: gown.name,
      price: gown.price,
      shape: gown.shape || gown.silhouette,
      fabric: gown.fabric,
      neckline: gown.neckline,
      tags: Array.isArray(gown.tags) ? gown.tags.slice(0, 8) : [],
      quickShip: Array.isArray(gown.tags) && gown.tags.some((tag) => /quick.?ship/i.test(tag))
    }));
    const question = input.filter((message) => message.role === 'user').at(-1)?.content.toLowerCase() || '';
    const terms = question.split(/[^a-z0-9]+/).filter((term) => term.length > 3);
    const relevantCatalog = catalog
      .map((gown) => {
        const details = `${gown.name} ${gown.shape || ''} ${gown.fabric || ''} ${gown.neckline || ''} ${gown.tags.join(' ')}`.toLowerCase();
        const score = terms.reduce((total, term) => total + (details.includes(term) ? 1 : 0), 0)
          + (/quick.?ship|fast|soon|near/i.test(question) && gown.quickShip ? 3 : 0);
        return { gown, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ gown }) => gown);
    const siteContext = {
      catalog: relevantCatalog,
      quickShipStyles: (db.quickShip?.products || []).slice(0, 12).map(({ name, shape, fabric, price }) => ({ name, shape, fabric, price })),
      accessories: (db.accessories?.items || []).slice(0, 12).map(({ name, category, description }) => ({ name, category, description })),
      collections: (db.allCollections?.seasonal || []).map(({ title, name, description }) => ({ title, name, description })),
      storyFAQs: (db.ourStory?.faqs || []).slice(0, 8),
      shipping: db.channels ? { freeShippingThreshold: db.channels.freeShippingThreshold, currencies: db.channels.currencies } : undefined
    };
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:5173',
        'X-Title': 'VELORA Atelier Bridal Stylist'
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'google/gemma-4-26b-a4b-it:free',
        messages: [
          {
            role: 'system',
            content: `${stylistInstructions}\nCurrent page: ${page}\nSite information (use only this information for VELORA-specific answers): ${JSON.stringify(siteContext)}`
          },
          ...input
        ],
        max_tokens: 280,
        temperature: 0.4,
        stream: true
      }),
      signal: AbortSignal.timeout(35000)
    });

    if (!response.ok) {
      const result = await response.json();
      console.error('[VELORA Stylist] OpenRouter request failed:', response.status, result?.error?.code || 'unknown');
      const publicMessage = response.status === 429
        ? 'The free model is busy or its usage limit has been reached. Please try again shortly.'
        : response.status === 401
          ? 'The OpenRouter key is invalid. Check OPENROUTER_API_KEY in .env.server, then restart the backend.'
          : response.status === 402
            ? 'OpenRouter could not route this request to a free model right now.'
            : 'The stylist is temporarily unavailable. Please try again.';
      return res.status(response.status === 429 ? 429 : response.status === 401 ? 503 : 502).json({ error: publicMessage });
    }

    res.set({
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    res.flushHeaders();
    const decoder = new TextDecoder();
    let pending = '';
    for await (const part of response.body) {
      pending += decoder.decode(part, { stream: true });
      const lines = pending.split('\n');
      pending = lines.pop() || '';
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const chunk = JSON.parse(data);
          const text = chunk.choices?.[0]?.delta?.content;
          if (typeof text === 'string' && text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
        } catch {
          // Ignore provider metadata lines that are not chat tokens.
        }
      }
    }
    const tail = decoder.decode();
    if (tail) pending += tail;
    res.end('data: [DONE]\n\n');
  } catch (error) {
    console.error('[VELORA Stylist] Request failed:', error.name || 'Error');
    if (res.headersSent) {
      if (!res.destroyed && !res.writableEnded) {
        res.write(`data: ${JSON.stringify({ error: 'The stylist connection was interrupted.' })}\n\n`);
        res.end();
      }
      return;
    }
    return res.status(502).json({ error: 'The stylist could not reply just now.' });
  }
});

export default router;
