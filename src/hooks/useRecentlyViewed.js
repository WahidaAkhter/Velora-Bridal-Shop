import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'velora_recent';
const MAX_RECENT = 8;

const readStoredIds = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const useRecentlyViewed = () => {
  const [recentIds, setRecentIds] = useState(readStoredIds);

  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (!e || e.key === STORAGE_KEY || e.type === 'velora:recent_update') {
        setRecentIds(readStoredIds());
      }
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('velora:recent_update', handleStorageUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('velora:recent_update', handleStorageUpdate);
    };
  }, []);

  const track = useCallback((id) => {
    if (!id) return;
    try {
      const current = readStoredIds();
      const updated = [id, ...current.filter((item) => item !== id)].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecentIds(updated);
      window.dispatchEvent(new Event('velora:recent_update'));
    } catch (err) {
      console.warn('useRecentlyViewed track error:', err);
    }
  }, []);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentIds([]);
      window.dispatchEvent(new Event('velora:recent_update'));
    } catch (err) {
      console.warn('useRecentlyViewed clear error:', err);
    }
  }, []);

  return { recentIds, track, clear };
};
