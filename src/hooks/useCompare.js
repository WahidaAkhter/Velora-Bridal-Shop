import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

const STORAGE_KEY = 'velora_compare';
const MAX_COMPARE = 3;

const readStoredIds = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
};

export const useCompare = () => {
  const { showToast } = useApp();
  const [compareIds, setCompareIds] = useState(readStoredIds);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (!e || e.key === STORAGE_KEY || e.type === 'velora:compare_update') {
        setCompareIds(readStoredIds());
      }
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('velora:compare_update', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('velora:compare_update', handleUpdate);
    };
  }, []);

  const persist = (ids) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      setCompareIds(ids);
      window.dispatchEvent(new Event('velora:compare_update'));
    } catch (err) {
      console.warn('useCompare persist error:', err);
    }
  };

  const isInCompare = useCallback(
    (id) => Boolean(id && compareIds.includes(id)),
    [compareIds]
  );

  const toggle = useCallback(
    (id) => {
      if (!id) return;
      const current = readStoredIds();
      if (current.includes(id)) {
        // Remove if already present
        const updated = current.filter((item) => item !== id);
        persist(updated);
        showToast('Removed gown from comparison', 'info');
      } else {
        // Check max 3 limit
        if (current.length >= MAX_COMPARE) {
          showToast('You can compare up to 3 gowns', 'warning');
          return;
        }
        const updated = [...current, id];
        persist(updated);
        showToast(`Added gown to comparison (${updated.length}/3)`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showToast]
  );

  const remove = useCallback((id) => {
    if (!id) return;
    const current = readStoredIds();
    const updated = current.filter((item) => item !== id);
    persist(updated);
  }, []);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setCompareIds([]);
      window.dispatchEvent(new Event('velora:compare_update'));
    } catch (err) {
      console.warn('useCompare clear error:', err);
    }
  }, []);

  return {
    compareIds,
    toggle,
    remove,
    clear,
    isInCompare
  };
};

