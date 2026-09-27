import React, { useEffect } from 'react';
import './DeleteConfirmModal.css';

/**
 * DeleteConfirmModal Component
 * Prompts user for confirmation before deleting an employee record.
 */
export default function DeleteConfirmModal({
  isOpen,
  employee,
  onConfirm,
  onCancel
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !employee) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel} role="dialog" aria-modal="true">
      <div 
        className="delete-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-icon-badge">⚠️</div>
        
        <h3 className="delete-modal-title">Delete Employee Record?</h3>
        
        <p className="delete-modal-desc">
          Are you sure you want to permanently remove <strong>{employee.name}</strong>{' '}
          (<span className="emp-id-highlight">{employee.empId}</span>) from the{' '}
          <strong>{employee.department}</strong> department?
        </p>

        <div className="delete-warning-box">
          <span>This action cannot be undone. All farm assignment logs will be removed.</span>
        </div>

        <div className="delete-actions-row">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => onConfirm(employee.id)}
          >
            🗑️ Yes, Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}
