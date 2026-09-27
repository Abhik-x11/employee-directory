import React from 'react';
import './StatsSummary.css';

export default function StatsSummary({ totalEmployees, filteredCount, employees, departments }) {
  const maleCount = employees.filter((e) => e.gender === 'Male').length;
  const femaleCount = employees.filter((e) => e.gender === 'Female').length;
  const otherCount = employees.filter((e) => e.gender !== 'Male' && e.gender !== 'Female').length;

  return (
    <section className="stats-section container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper">👥</div>
          <div className="stat-data">
            <span className="stat-label">Total Staff</span>
            <span className="stat-value">{totalEmployees}</span>
            <span className="stat-detail">Registered Farm Workers</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">🚜</div>
          <div className="stat-data">
            <span className="stat-label">Departments</span>
            <span className="stat-value">{departments.length}</span>
            <span className="stat-detail">Agri Divisions Active</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">⚖️</div>
          <div className="stat-data">
            <span className="stat-label">Gender Diversity</span>
            <span className="stat-value">{maleCount}M : {femaleCount}F</span>
            <span className="stat-detail">
              {otherCount > 0 ? `+${otherCount} Other` : 'Balanced Workforce'}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">🔍</div>
          <div className="stat-data">
            <span className="stat-label">Currently Displayed</span>
            <span className="stat-value" style={{ color: 'var(--emerald-light)' }}>
              {filteredCount}
            </span>
            <span className="stat-detail">Matching Filter Criteria</span>
          </div>
        </div>
      </div>
    </section>
  );
}
