import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'velora_wedding_date';

/**
 * Validates a YYYY-MM-DD string representation of a calendar date.
 * Returns true only if the string strictly represents a real calendar date.
 */
export const isValidDateString = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
  if (!match) return false;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (year < 1900 || year > 2200 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  // Check month lengths and leap years via UTC
  const testDate = new Date(Date.UTC(year, month - 1, day));
  return (
    testDate.getUTCFullYear() === year &&
    testDate.getUTCMonth() === month - 1 &&
    testDate.getUTCDate() === day
  );
};

const readStoredDate = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const clean = raw.trim();
    return isValidDateString(clean) ? clean : null;
  } catch {
    return null;
  }
};

export const useWeddingDate = () => {
  const [weddingDate, setWeddingDateState] = useState(readStoredDate);

  useEffect(() => {
    const handleSync = (e) => {
      if (!e || e.key === STORAGE_KEY || e.type === 'velora:wedding_date_update') {
        setWeddingDateState(readStoredDate());
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('velora:wedding_date_update', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('velora:wedding_date_update', handleSync);
    };
  }, []);

  const setWeddingDate = useCallback((val) => {
    try {
      if (!val) {
        localStorage.removeItem(STORAGE_KEY);
        setWeddingDateState(null);
        window.dispatchEvent(new Event('velora:wedding_date_update'));
        return true;
      }

      const formatted = String(val).trim();
      if (!isValidDateString(formatted)) {
        return false;
      }

      localStorage.setItem(STORAGE_KEY, formatted);
      setWeddingDateState(formatted);
      window.dispatchEvent(new Event('velora:wedding_date_update'));
      return true;
    } catch (err) {
      console.warn('useWeddingDate setWeddingDate error:', err);
      return false;
    }
  }, []);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setWeddingDateState(null);
      window.dispatchEvent(new Event('velora:wedding_date_update'));
    } catch (err) {
      console.warn('useWeddingDate clear error:', err);
    }
  }, []);

  return {
    weddingDate,
    setWeddingDate,
    clear
  };
};
