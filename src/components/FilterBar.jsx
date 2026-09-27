import React from 'react';
import './FilterBar.css';

/**
 * FilterBar Component
 * Includes Search Input, Department Dropdown, Quick-filter Pills,
 * and View Mode Switcher (Card Grid vs Table).
 */
export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
  onResetFilters,
  viewMode = 'grid',
  onViewModeChange,
  filteredCount,
  totalCount
}) {
  const isFiltered = searchQuery.trim() !== '' || selectedDepartment !== 'ALL';

  return (
    <section className="filter-bar-section container">
      <div className="filter-bar-container">
        
        {/* Main Search & Department Controls */}
        <div className="filter-controls-row">
          
          {/* Real-time Search Input */}
          <div className="search-box-wrapper">
            <span className="search-box-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              placeholder="Search by name, employee ID, phone, or address..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-box-input"
              aria-label="Search employees"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => onSearchChange('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Department Filter Dropdown */}
          <div className="select-wrapper">
            <select
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="department-select"
              aria-label="Filter by department"
            >
              <option value="ALL">All Departments ({totalCount})</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle: Grid Cards vs Table */}
          <div className="view-toggle-group" role="group" aria-label="Display View">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Cards Grid View"
            >
              ⊞ Grid
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => onViewModeChange('table')}
              title="Table View"
            >
              ☰ Table
            </button>
          </div>

          {/* Reset Filters Button (Conditionally Rendered) */}
          {isFiltered && (
            <button 
              type="button" 
              className="btn btn-secondary reset-btn" 
              onClick={onResetFilters}
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* Quick Department Filter Pills */}
        <div className="department-pills">
          <span className="pill-label">Department:</span>
          <button
            type="button"
            className={`dept-pill ${selectedDepartment === 'ALL' ? 'active' : ''}`}
            onClick={() => onDepartmentChange('ALL')}
          >
            All Divisions
          </button>
          {departments.map((dept, idx) => {
            const shortName = dept.split('&')[0].trim();
            return (
              <button
                key={idx}
                type="button"
                className={`dept-pill ${selectedDepartment === dept ? 'active' : ''}`}
                onClick={() => onDepartmentChange(dept)}
                title={dept}
              >
                {shortName}
              </button>
            );
          })}
        </div>

        {/* Filter Results Summary Counter */}
        <div className="filter-status-row">
          <span className="filter-status-text">
            Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> farm employees
            {selectedDepartment !== 'ALL' && (
              <> in <span className="highlight-tag">{selectedDepartment}</span></>
            )}
            {searchQuery && (
              <> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</>
            )}
          </span>
        </div>

      </div>
    </section>
  );
}
