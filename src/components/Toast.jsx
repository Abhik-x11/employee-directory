import React, { useEffect } from 'react';
import './Toast.css';

/**
 * Toast Component
 * Displays temporary alert messages for user action feedback.
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const { message, type = 'success' } = toast;

  return (
    <div className={`toast-container toast-${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✅' : type === 'info' ? 'ℹ️' : '⚠️'}
      </span>
      <span className="toast-msg">{message}</span>
      <button 
        type="button" 
        className="toast-close-btn" 
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}
