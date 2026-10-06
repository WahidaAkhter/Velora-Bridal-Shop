import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      className={`toast-notification glass-panel toast-${toast.type} toast-enter`}
      role="status"
      aria-live="polite"
    >
      {toast.type === 'success' && <CheckCircle2 size={18} className="text-success" />}
      {toast.type === 'info' && <Info size={18} className="text-accent" />}
      {toast.type === 'warning' && <AlertTriangle size={18} className="text-amber" />}
      <span className="toast-message">{toast.message}</span>
      <span className="toast-progress" aria-hidden="true" />
    </div>
  );
};
