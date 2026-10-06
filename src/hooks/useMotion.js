import { useEffect, useRef, useState } from 'react';

/**
 * Adds a "revealed" flag once the element scrolls into view.
 * Used for staggered entrance animations; the flag never resets, so
 * cards don't re-animate while the user scrolls back and forth.
 */
export const useReveal = (options = { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    if (!('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  return [ref, revealed];
};

/** Keeps a component mounted for `delay` ms after `isOpen` turns false, so exit animations can play. */
export const useDelayedUnmount = (isOpen, delay = 260) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return;
    }
    const t = setTimeout(() => setShouldRender(false), delay);
    return () => clearTimeout(t);
  }, [isOpen, delay]);

  return { shouldRender, isClosing: shouldRender && !isOpen };
};
