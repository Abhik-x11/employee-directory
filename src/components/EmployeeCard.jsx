import React from 'react';
import './EmployeeCard.css';

/**
 * EmployeeCard Component
 * Displays full farm employee details and exposes Edit/Delete event handlers.
 */
export default function EmployeeCard({ employee, onEdit, onDelete }) {
  const {
    name,
    empId,
    department,
    gender,
    phone,
    localAddress,
    permanentAddress,
    role
  } = employee;

  const genderIcon = gender === 'Female' ? '👩' : gender === 'Male' ? '👨' : '🧑';

  return (
    <article className="employee-card">
      <div className="card-header-row">
        <div className="emp-avatar-badge">{genderIcon}</div>
        <div className="emp-identity">
          <h3 className="emp-name">{name}</h3>
          <span className="emp-id-pill">ID: {empId}</span>
        </div>
        <span className="emp-gender-badge">{gender}</span>
      </div>

      <div className="emp-dept-banner">
        <span className="dept-name">{department}</span>
        {role && <span className="dept-role">{role}</span>}
      </div>

      <div className="emp-details-list">
        {/* Phone Number */}
        <div className="detail-row">
          <span className="detail-label">📞 Phone Number:</span>
          <a href={`tel:${phone}`} className="detail-val phone-link">
            {phone}
          </a>
        </div>

        {/* Local Address */}
        <div className="detail-row">
          <span className="detail-label">📍 Local Address:</span>
          <p className="detail-val">{localAddress}</p>
        </div>

        {/* Permanent Address */}
        <div className="detail-row">
          <span className="detail-label">🏡 Permanent Address:</span>
          <p className="detail-val">{permanentAddress}</p>
        </div>
      </div>

      {/* Edit & Delete Actions with Event Handlers */}
      <div className="card-actions-row">
        <button 
          className="action-btn edit-btn" 
          onClick={() => onEdit(employee)}
          title={`Edit ${name}'s information`}
        >
          ✏️ Edit Details
        </button>
        <button 
          className="action-btn delete-btn" 
          onClick={() => onDelete(employee)}
          title={`Delete ${name}`}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}
