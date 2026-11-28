import { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const starterPrompts = [
  'Help me find my dress style',
  'Make me a wedding dress timeline',
  'What should I bring to my fitting?'
];

const welcomeMessage = {
  role: 'assistant',
  content: 'Welcome to VELORA Atelier. I can help you explore gowns, compare styles, and plan your next steps. What would you like help with?'
};

function StylistBotIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 2.75c-9.53 0-17.25 7.02-17.25 15.68 0 5.08 2.66 9.6 6.78 12.45l-1.3 5.82 7.17-3.03c1.47.39 3.01.59 4.6.59 9.53 0 17.25-7.02 17.25-15.68S29.53 2.75 20 2.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14.15 13.1h11.7a3.35 3.35 0 0 1 3.35 3.35v6.4a3.35 3.35 0 0 1-3.35 3.35h-11.7a3.35 3.35 0 0 1-3.35-3.35v-6.4a3.35 3.35 0 0 1 3.35-3.35Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.8 17.25v4.8M31.2 17.25v4.8M16.3 18.05v2.1M23.7 18.05v2.1M17.5 23.25c1.4 1.2 3.6 1.2 5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function BridalStylistChat() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [retryQuestion, setRetryQuestion] = useState('');
  const [canRetry, setCanRetry] = useState(true);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isSending]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const sendMessage = async (value = draft) => {
    const content = value.trim();
    if (!content || isSending) return;

    const nextMessages = [...messages, { role: 'user', content }];
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    setDraft('');
    setIsSending(true);
    setErrorMessage('');
    setRetryQuestion('');
    setCanRetry(true);

    try {
      const response = await fetch('http://localhost:5000/api/stylist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.content && !errorMessage.includes(message.content))
            .slice(-6)
            .map(({ role, content: message }) => ({ role, content: message })),
          page: location.pathname
        })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || 'The stylist is temporarily unavailable. Please try again.');
        error.status = response.status;
        error.retryable = data.retryable ?? (response.status >= 500 || response.status === 429);
        throw error;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Your browser could not open the live reply. Please try again.');
      const decoder = new TextDecoder();
      let pending = '';
      let reply = '';
      let finished = false;

      while (!finished) {
        const { value, done } = await reader.read();
        pending += decoder.decode(value || new Uint8Array(), { stream: !done });
        const events = pending.split('\n\n');
        pending = events.pop() || '';

        for (const event of events) {
          const dataLine = event.split('\n').find((line) => line.startsWith('data:'));
          if (!dataLine) continue;
          const data = dataLine.slice(5).trim();
          if (!data || data === '[DONE]') { finished = true; break; }
          let chunk;
          try { chunk = JSON.parse(data); } catch { continue; }
          if (chunk.error) {
            const error = new Error(chunk.error);
            error.retryable = chunk.retryable !== false;
            throw error;
          }
          if (typeof chunk.text === 'string') {
            reply += chunk.text;
            setMessages((current) => current.map((message, index) => (
              index === current.length - 1 ? { ...message, content: reply } : message
            )));
          }
        }
        if (done) finished = true;
      }

      if (!reply.trim()) throw new Error('The stylist returned an empty reply. Please try again.');
    } catch (error) {
      const message = error.message || 'The stylist is temporarily unavailable. Please try again.';
      setErrorMessage(message);
      setRetryQuestion(content);
      setCanRetry(error.retryable !== false);
      setMessages((current) => current.map((item, index) => (
        index === current.length - 1 ? { ...item, content: message } : item
      )));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bridal-stylist">
      {isOpen && (
        <section className="stylist-panel" role="dialog" aria-modal="false" aria-labelledby="stylist-title">
          <header className="stylist-header">
            <div className="stylist-brand-mark" aria-hidden="true">V</div>
            <div className="stylist-heading">
              <span className="stylist-eyebrow">VELORA ATELIER</span>
              <h2 id="stylist-title">Your bridal stylist</h2>
              <span className="stylist-presence"><i /> Here to help you plan</span>
            </div>
            <button className="stylist-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close bridal stylist">
              <X size={19} />
            </button>
          </header>

          <div className="stylist-messages" ref={logRef} aria-live="polite">
            {messages.map((message, index) => (
              <div className={`stylist-message stylist-message-${message.role}`} key={`${message.role}-${index}`}>
                {message.role === 'assistant' && <span className="stylist-message-mark" aria-hidden="true">V</span>}
                <p>{message.content}</p>
              </div>
            ))}
            {isSending && <div className="stylist-typing" aria-label="Stylist is thinking"><i /><i /><i /></div>}
            {errorMessage && canRetry && (
              <div className="stylist-error-actions" role="status">
                <button type="button" onClick={() => sendMessage(retryQuestion)}>Try again</button>
              </div>
            )}
            {messages.length === 1 && !isSending && (
              <div className="stylist-prompts">
                <span>Perhaps I can help with…</span>
                {starterPrompts.map((prompt) => (
                  <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>{prompt}<span>↗</span></button>
                ))}
              </div>
            )}
          </div>

          <form className="stylist-composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <label className="stylist-sr-only" htmlFor="stylist-message">Ask your bridal stylist</label>
            <input
              id="stylist-message"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask me anything about your dress…"
              maxLength={1000}
              disabled={isSending}
            />
            <button type="submit" disabled={!draft.trim() || isSending} aria-label="Send message"><Send size={17} /></button>
          </form>
          <div className="stylist-footnote">Personal bridal guidance, thoughtfully considered</div>
        </section>
      )}

      <button
        type="button"
        className={`stylist-launcher ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close bridal stylist' : 'Chat with your bridal stylist'}
      >
        {isOpen ? <X size={21} /> : <span className="stylist-launcher-icon"><StylistBotIcon /></span>}
      </button>
    </div>
  );
}
