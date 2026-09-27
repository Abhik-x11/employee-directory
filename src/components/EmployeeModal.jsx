import React, { useState, useEffect } from 'react';
import './EmployeeModal.css';

/**
 * EmployeeModal Component
 * Handles both "Add New Employee" and "Edit Employee Details" using React state and events.
 * Captures all required farm fields: Name, ID, Department, Gender, Phone, Local Address, Permanent Address.
 */
export default function EmployeeModal({
  isOpen,
  onClose,
  onSave,
  employeeToEdit = null,
  departments = []
}) {
  const isEditing = Boolean(employeeToEdit);

  // Initialize state directly from props (reset triggered by key in parent)
  const [formData, setFormData] = useState(() => ({
    name: employeeToEdit?.name || '',
    empId: employeeToEdit?.empId || '',
    department: employeeToEdit?.department || departments[0] || 'Crop Production & Harvesting',
    gender: employeeToEdit?.gender || 'Male',
    phone: employeeToEdit?.phone || '',
    localAddress: employeeToEdit?.localAddress || '',
    permanentAddress: employeeToEdit?.permanentAddress || '',
    role: employeeToEdit?.role || ''
  }));

  const [sameAddress, setSameAddress] = useState(() =>
    Boolean(
      employeeToEdit?.localAddress &&
      employeeToEdit.localAddress === employeeToEdit.permanentAddress
    )
  );

  const [errors, setErrors] = useState({});

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Generic input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (sameAddress && name === 'localAddress') {
        updated.permanentAddress = value;
      }
      return updated;
    });

    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Toggle "Same as Local Address"
  const handleSameAddressToggle = (e) => {
    const checked = e.target.checked;
    setSameAddress(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: prev.localAddress
      }));
      if (errors.permanentAddress) {
        setErrors((prev) => ({ ...prev, permanentAddress: null }));
      }
    }
  };

  // Quick auto-generate ID helper for fast addition
  const handleAutoGenerateId = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generated = `GHF-${randomSuffix}`;
    setFormData((prev) => ({ ...prev, empId: generated }));
    if (errors.empId) {
      setErrors((prev) => ({ ...prev, empId: null }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    if (!formData.empId.trim()) {
      newErrors.empId = 'Employee ID is required (e.g., GHF-0107)';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department selection is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+() -]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.localAddress.trim()) {
      newErrors.localAddress = 'Local farm / residential address is required';
    }

    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Permanent native address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave({
      ...(employeeToEdit ? { id: employeeToEdit.id } : {}),
      name: formData.name.trim(),
      empId: formData.empId.trim(),
      department: formData.department.trim(),
      gender: formData.gender,
      phone: formData.phone.trim(),
      localAddress: formData.localAddress.trim(),
      permanentAddress: formData.permanentAddress.trim(),
      role: formData.role.trim() || 'Farm Staff Member'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        tabIndex="-1"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-header-icon">{isEditing ? '✏️' : '🌱'}</span>
            <div>
              <h2 className="modal-title">
                {isEditing ? `Edit Details: ${employeeToEdit.name}` : 'Add New Farm Employee'}
              </h2>
              <p className="modal-subtitle">
                {isEditing
                  ? 'Update farm worker credentials and contact locations'
                  : 'Register a new worker to the GreenHarvest Farm directory'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-grid">
            
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="emp-name" className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                id="emp-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Chandra Verma"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <span className="field-error-msg">⚠️ {errors.name}</span>}
            </div>

            {/* Employee ID */}
            <div className="form-group">
              <div className="label-with-action">
                <label htmlFor="emp-id" className="form-label">
                  Employee ID <span className="required-star">*</span>
                </label>
                {!isEditing && (
                  <button 
                    type="button" 
                    className="quick-action-link" 
                    onClick={handleAutoGenerateId}
                  >
                    🎲 Auto-generate ID
                  </button>
                )}
              </div>
              <input
                id="emp-id"
                type="text"
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                placeholder="e.g. GHF-0108"
                className={`form-input font-mono ${errors.empId ? 'input-error' : ''}`}
              />
              {errors.empId && <span className="field-error-msg">⚠️ {errors.empId}</span>}
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="emp-dept" className="form-label">
                Department Name <span className="required-star">*</span>
              </label>
              <select
                id="emp-dept"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`form-select ${errors.department ? 'input-error' : ''}`}
              >
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <span className="field-error-msg">⚠️ {errors.department}</span>}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label className="form-label">
                Gender <span className="required-star">*</span>
              </label>
              <div className="gender-radio-group">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label 
                    key={g} 
                    className={`gender-option-label ${formData.gender === g ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="gender-radio-input"
                    />
                    <span>{g === 'Male' ? '👨 Male' : g === 'Female' ? '👩 Female' : '🧑 Other'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="emp-phone" className="form-label">
                Phone Number <span className="required-star">*</span>
              </label>
              <input
                id="emp-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
              />
              {errors.phone && <span className="field-error-msg">⚠️ {errors.phone}</span>}
            </div>

            {/* Role / Job Title (Optional extra) */}
            <div className="form-group">
              <label htmlFor="emp-role" className="form-label">
                Role / Job Title
              </label>
              <input
                id="emp-role"
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Agronomist / Fleet Operator"
                className="form-input"
              />
            </div>

            {/* Local Address */}
            <div className="form-group full-width">
              <label htmlFor="emp-local-address" className="form-label">
                Local Address (Current / Farm Quarters) <span className="required-star">*</span>
              </label>
              <textarea
                id="emp-local-address"
                name="localAddress"
                rows="2"
                value={formData.localAddress}
                onChange={handleChange}
                placeholder="e.g. Staff Quarters Block B, Room 14, GreenHarvest Farm"
                className={`form-textarea ${errors.localAddress ? 'input-error' : ''}`}
              />
              {errors.localAddress && <span className="field-error-msg">⚠️ {errors.localAddress}</span>}
            </div>

            {/* Permanent Address with Same-as Checkbox */}
            <div className="form-group full-width">
              <div className="label-with-action">
                <label htmlFor="emp-perm-address" className="form-label">
                  Permanent Address (Native / Hometown) <span className="required-star">*</span>
                </label>
                <label className="checkbox-toggle-label">
                  <input
                    type="checkbox"
                    checked={sameAddress}
                    onChange={handleSameAddressToggle}
                  />
                  <span>Same as Local Address</span>
                </label>
              </div>
              <textarea
                id="emp-perm-address"
                name="permanentAddress"
                rows="2"
                value={formData.permanentAddress}
                onChange={handleChange}
                disabled={sameAddress}
                placeholder="e.g. Village Rampur, P.O. Shantiniketan, District Birbhum - 731204"
                className={`form-textarea ${errors.permanentAddress ? 'input-error' : ''} ${sameAddress ? 'disabled-textarea' : ''}`}
              />
              {errors.permanentAddress && <span className="field-error-msg">⚠️ {errors.permanentAddress}</span>}
            </div>

          </div>

          {/* Form Actions */}
          <div className="modal-actions-bar">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {isEditing ? '💾 Save Changes' : '✨ Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
