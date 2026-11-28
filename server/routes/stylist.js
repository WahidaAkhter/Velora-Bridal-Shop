import express from 'express';
import { getDB } from '../data/store.js';

const router = express.Router();
const requestWindows = new Map();
const freeModelFallbacks = [
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-nano-30b-a3b:free',
  'liquid/lfm-3-1.7b:free'
];

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

  const provider = process.env.STYLIST_PROVIDER || 'ollama';
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (provider === 'openrouter' && !apiKey) {
    return res.status(503).json({ error: 'OpenRouter is not configured.' });
  }
  if (!['ollama', 'openrouter'].includes(provider)) {
    return res.status(500).json({ error: 'STYLIST_PROVIDER must be ollama or openrouter.' });
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
    const terms = question.split(/[^a-z0-9]+/).filter((term) => term.length > 2);
    const asksAboutDresses = /dress|gown|silhouette|shape|neckline|fabric|train|bodice|sleeve|bridal look|collection|style|price|cost|available|stock/i.test(question)
      || /collection|dress|gown|shop/i.test(page);
    const asksAboutQuickShip = /quick.?ship|fast|delivery|shipping|arrive|wedding date|timeline/i.test(question);
    const asksAboutAccessories = /accessor|veil|shoe|shoes|jewel|jewelry|earring|necklace|sash|headpiece/i.test(question);
    const asksAboutStory = /about velora|our story|boutique|appointment|consultation|store|faq/i.test(question)
      || /story|appointment/i.test(page);
    const relevantCatalog = catalog
      .map((gown) => {
        const details = `${gown.name} ${gown.shape || ''} ${gown.fabric || ''} ${gown.neckline || ''} ${gown.tags.join(' ')}`.toLowerCase();
        const score = terms.reduce((total, term) => total + (details.includes(term) ? 1 : 0), 0)
          + (/quick.?ship|fast|soon|near/i.test(question) && gown.quickShip ? 3 : 0);
        return { gown, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, asksAboutDresses ? 5 : 0)
      .map(({ gown }) => gown);
    const siteContext = {};
    if (asksAboutDresses) siteContext.matchingGowns = relevantCatalog;
    if (asksAboutQuickShip) {
      siteContext.quickShipStyles = (db.quickShip?.products || []).slice(0, 5).map(({ name, shape, fabric, price }) => ({ name, shape, fabric, price }));
      if (db.channels) siteContext.shipping = { freeShippingThreshold: db.channels.freeShippingThreshold, currencies: db.channels.currencies };
    }
    if (asksAboutAccessories) {
      siteContext.accessories = (db.accessories?.items || []).slice(0, 5).map(({ name, category, description }) => ({ name, category, description }));
    }
    if (asksAboutStory) {
      siteContext.collections = (db.allCollections?.seasonal || []).slice(0, 4).map(({ title, name, description }) => ({ title, name, description }));
      siteContext.storyFAQs = (db.ourStory?.faqs || []).slice(0, 4);
    }
    const chatMessages = [
      {
        role: 'system',
        content: `${stylistInstructions}\nCurrent page: ${page}\nSite information (use only this information for VELORA-specific answers): ${JSON.stringify(siteContext)}`
      },
      ...input
    ];

    if (provider === 'ollama') {
      const baseUrl = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/+$/, '');
      const model = process.env.OLLAMA_MODEL || 'qwen3:1.7b';
      const localResponse = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: chatMessages,
          stream: true,
          think: false,
          // Keep the model in RAM between chats; Ollama unloads it when its service stops.
          keep_alive: -1,
          options: { temperature: 0.4, num_predict: 220, num_ctx: 4096 }
        }),
        signal: AbortSignal.timeout(90000)
      });

      if (!localResponse.ok) {
        const result = await localResponse.json().catch(() => ({}));
        const missingModel = localResponse.status === 404 || /model.+not found/i.test(result.error || '');
        return res.status(missingModel ? 503 : 502).json({
          error: missingModel
            ? `Ollama model “${model}” is not installed. Run “ollama pull ${model}” in PowerShell, then try again.`
            : `Ollama returned an error: ${result.error || localResponse.statusText}`,
          retryable: true
        });
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
      for await (const part of localResponse.body) {
        pending += decoder.decode(part, { stream: true });
        const lines = pending.split('\n');
        pending = lines.pop() || '';
        for (const line of lines) {
          if (!line.trim()) continue;
          let chunk;
          try { chunk = JSON.parse(line); } catch { continue; }
          if (chunk.error) {
            res.write(`data: ${JSON.stringify({ error: 'Ollama stopped while generating the reply. Please try again.' })}\n\n`);
            res.end();
            return;
          }
          const text = chunk.message?.content;
          if (typeof text === 'string' && text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }
      res.end('data: [DONE]\n\n');
      return;
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:5173',
        'X-Title': 'VELORA Atelier Bridal Stylist'
      },
      body: JSON.stringify({
        models: [
          ...(process.env.OPENROUTER_MODEL?.endsWith(':free') ? [process.env.OPENROUTER_MODEL] : []),
          ...freeModelFallbacks
        ]
          .filter((model, index, models) => model && models.indexOf(model) === index),
        messages: chatMessages,
        max_tokens: 280,
        temperature: 0.4,
        stream: true
      }),
      signal: AbortSignal.timeout(35000)
    });

    if (!response.ok) {
      const result = await response.json();
      const limitSource = result?.error?.metadata?.limit_source || '';
      const retryAfter = response.headers.get('Retry-After');
      console.error('[VELORA Stylist] OpenRouter request failed:', response.status, result?.error?.code || 'unknown', limitSource || '');
      let publicMessage = 'The stylist is temporarily unavailable. Please try again.';
      let retryable = response.status >= 500 || response.status === 429;

      if (response.status === 429 && /free_tier_per_minute/i.test(limitSource)) {
        publicMessage = 'The OpenRouter free request limit was reached. Wait a minute before trying again.';
      } else if (response.status === 429 && /free_tier.*day|daily/i.test(limitSource)) {
        publicMessage = 'The OpenRouter free daily allowance has been used. It resets daily; trying another free model will not bypass this limit.';
        retryable = false;
      } else if (response.status === 429) {
        publicMessage = 'OpenRouter rate-limited this request. The free models have backup routes, but an account limit may require waiting for its reset.';
      } else if (response.status === 401) {
        publicMessage = 'The OpenRouter key is invalid. Check OPENROUTER_API_KEY in .env.server, then restart the backend.';
        retryable = false;
      } else if (response.status === 402) {
        publicMessage = 'OpenRouter could not route this request with the current account balance or model access.';
        retryable = false;
      }

      if (retryAfter) res.set('Retry-After', retryAfter);
      return res.status(response.status === 429 ? 429 : response.status === 401 ? 503 : 502).json({ error: publicMessage, retryable });
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
          if (chunk.error) {
            const limitSource = chunk.error?.metadata?.limit_source || '';
            const providerMessage = chunk.error?.message || '';
            const dailyLimit = /free_tier.*daily|daily/i.test(limitSource);
            const message = dailyLimit
              ? 'The OpenRouter free daily allowance has been used. It resets daily; trying another free model will not bypass this limit.'
              : /429|rate.?limit/i.test(providerMessage)
                ? 'OpenRouter rate-limited this request after it started. Please wait before retrying.'
                : 'The stylist connection was interrupted. Please try again.';
            res.write(`data: ${JSON.stringify({ error: message, retryable: !dailyLimit })}\n\n`);
            res.end();
            return;
          }
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
    if (provider === 'ollama' && (error.cause?.code === 'ECONNREFUSED' || error.name === 'TypeError')) {
      return res.status(503).json({
        error: 'Ollama is not running. Install and open Ollama, then run “ollama pull qwen3:1.7b” in PowerShell.',
        retryable: true
      });
    }
    if (provider === 'ollama' && error.name === 'TimeoutError') {
      return res.status(504).json({ error: 'The local model is still loading. Please wait a moment and retry.', retryable: true });
    }
    return res.status(502).json({ error: 'The stylist could not reply just now.' });
  }
});

export default router;
