import React from 'react';
import './DepartmentBreakdown.css';

/**
 * DepartmentBreakdown Component
 * Displays live employee count by department and allows one-click filtering.
 */
export default function DepartmentBreakdown({
  departments,
  employees,
  selectedDepartment,
  onSelectDepartment
}) {
  return (
    <section className="dept-breakdown-section container">
      <div className="dept-breakdown-card">
        <div className="breakdown-header">
          <div className="breakdown-title-wrap">
            <span className="breakdown-icon">📊</span>
            <div>
              <h3 className="breakdown-title">Staff Distribution by Department</h3>
              <p className="breakdown-subtitle">Click any department card to filter employee view</p>
            </div>
          </div>
          {selectedDepartment !== 'ALL' && (
            <button
              className="view-all-btn"
              onClick={() => onSelectDepartment('ALL')}
            >
              Show All Departments ({employees.length})
            </button>
          )}
        </div>

        <div className="breakdown-chips-grid">
          {departments.map((dept) => {
            const count = employees.filter((e) => e.department === dept).length;
            const isSelected = selectedDepartment === dept;

            return (
              <button
                key={dept}
                type="button"
                className={`breakdown-chip ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectDepartment(isSelected ? 'ALL' : dept)}
              >
                <div className="chip-left">
                  <span className="chip-indicator"></span>
                  <span className="chip-name">{dept}</span>
                </div>
                <span className="chip-count-badge">
                  {count} {count === 1 ? 'employee' : 'employees'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
