import React from 'react';
import './EmployeeTable.css';

/**
 * EmployeeTable Component
 * Provides an alternative structured tabular view of all farm employees.
 */
export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="table-responsive-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name &amp; Role</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Local Address</th>
            <th>Permanent Address</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="table-row">
              <td>
                <span className="table-id-pill">{emp.empId}</span>
              </td>
              <td>
                <div className="table-name-cell">
                  <span className="table-emp-name">{emp.name}</span>
                  {emp.role && <span className="table-emp-role">{emp.role}</span>}
                </div>
              </td>
              <td>
                <span className="table-dept-pill">{emp.department}</span>
              </td>
              <td>
                <span className="table-gender-pill">
                  {emp.gender === 'Female' ? '👩 Female' : emp.gender === 'Male' ? '👨 Male' : '🧑 Other'}
                </span>
              </td>
              <td>
                <a href={`tel:${emp.phone}`} className="table-phone-link">
                  {emp.phone}
                </a>
              </td>
              <td className="table-addr-cell" title={emp.localAddress}>
                {emp.localAddress}
              </td>
              <td className="table-addr-cell" title={emp.permanentAddress}>
                {emp.permanentAddress}
              </td>
              <td className="text-right table-actions-cell">
                <button
                  type="button"
                  className="table-action-btn edit"
                  onClick={() => onEdit(emp)}
                  title={`Edit ${emp.name}`}
                >
                  ✏️ Edit
                </button>
                <button
                  type="button"
                  className="table-action-btn delete"
                  onClick={() => onDelete(emp)}
                  title={`Delete ${emp.name}`}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
