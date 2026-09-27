import React from 'react';
import './Navbar.css';

export default function Navbar({ totalEmployees, onOpenAddModal }) {
  return (
    <header className="farm-navbar">
      <div className="container navbar-inner">
        <div className="brand-section">
          <div className="brand-logo-icon">🌾</div>
          <div>
            <h1 className="brand-title">GreenHarvest Farm</h1>
            <p className="brand-subtitle">Employee Directory &amp; Staff Management</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="employee-count-badge" title="Total Registered Employees">
            <span className="badge-dot"></span>
            <span>Total Staff: <strong>{totalEmployees}</strong></span>
          </div>

          <button 
            className="btn btn-primary" 
            onClick={onOpenAddModal}
            aria-label="Add New Employee"
          >
            <span>+ Add Employee</span>
          </button>
        </div>
      </div>
    </header>
  );
}
