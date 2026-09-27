import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsSummary from './components/StatsSummary';
import FilterBar from './components/FilterBar';
import DepartmentBreakdown from './components/DepartmentBreakdown';
import EmployeeCard from './components/EmployeeCard';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';

import { farmDepartments, initialEmployees } from './data/initialEmployees';
import './App.css';

const LOCAL_STORAGE_KEY = 'greenharvest_farm_employees_v1';

export default function App() {
  // 1. STATE: Employee list with localStorage persistence
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load employees from localStorage', e);
    }
    return initialEmployees;
  });

  // 2. STATE: Search and Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');

  // 3. STATE: Modal dialogs (Conditional Rendering)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  // 4. STATE: View Mode ('grid' or 'table')
  const [viewMode, setViewMode] = useState('grid');

  // 5. STATE: Toast alerts
  const [toast, setToast] = useState(null);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [employees]);

  // Helper to trigger toast notification
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // --- EVENT HANDLERS ---

  // Handle Search Input Change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle Department Filter Change
  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
  };

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('ALL');
  };

  // Open Edit Modal for Employee
  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp);
  };

  // Close Add/Edit Modal
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingEmployee(null);
  };

  // Save Employee (Handles both Add & Edit)
  const handleSaveEmployee = (empData) => {
    if (editingEmployee) {
      // Edit Existing Employee
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === empData.id ? empData : emp))
      );
      triggerToast(`✏️ Updated records for "${empData.name}"`, 'success');
    } else {
      // Add New Employee
      const newEmployee = {
        ...empData,
        id: `emp-${Date.now()}`
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      triggerToast(`🌱 Successfully added "${newEmployee.name}" to directory`, 'success');
    }
    handleCloseModal();
  };

  // Open Delete Confirmation Modal
  const handleOpenDeleteModal = (emp) => {
    setDeletingEmployee(emp);
  };

  // Confirm Delete Employee
  const handleConfirmDelete = (id) => {
    const empToDelete = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setDeletingEmployee(null);
    triggerToast(
      `🗑️ Removed ${empToDelete ? `"${empToDelete.name}"` : 'employee'} from directory`,
      'danger'
    );
  };

  // Reset to original initial farm data
  const handleResetDemoData = () => {
    if (window.confirm('Reset directory back to original 6 demo farm employees?')) {
      setEmployees(initialEmployees);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialEmployees));
      handleResetFilters();
      triggerToast('🔄 Demo farm data restored to default', 'info');
    }
  };

  // --- FILTERING LOGIC ---
  const filteredEmployees = employees.filter((emp) => {
    // 1. Filter by Department
    const matchesDept =
      selectedDepartment === 'ALL' || emp.department === selectedDepartment;

    // 2. Filter by Search Query (Name, ID, Phone, Local/Permanent Address, Role)
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesDept;

    const matchesSearch =
      (emp.name && emp.name.toLowerCase().includes(q)) ||
      (emp.empId && emp.empId.toLowerCase().includes(q)) ||
      (emp.phone && emp.phone.toLowerCase().includes(q)) ||
      (emp.department && emp.department.toLowerCase().includes(q)) ||
      (emp.localAddress && emp.localAddress.toLowerCase().includes(q)) ||
      (emp.permanentAddress && emp.permanentAddress.toLowerCase().includes(q)) ||
      (emp.role && emp.role.toLowerCase().includes(q));

    return matchesDept && matchesSearch;
  });

  return (
    <div className="farm-directory-app">
      {/* 1. Header Navigation */}
      <Navbar
        totalEmployees={employees.length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      <main className="main-content">
        {/* Assignment Badge and Header Banner */}
        <section className="hero-banner container">
          <div className="assignment-badge">
            <span>Assignment 3 &bull; React State, Events &amp; Conditional Rendering</span>
          </div>
          <h2 className="directory-heading">Agricultural Staff Directory</h2>
          <p className="directory-subheading">
            Manage farm workforce records: monitor personnel distribution, add new workers, 
            update contact locations, and query across departments.
          </p>
        </section>

        {/* 2. Employee Count & Diversity Stats */}
        <StatsSummary
          totalEmployees={employees.length}
          filteredCount={filteredEmployees.length}
          employees={employees}
          departments={farmDepartments}
        />

        {/* 3. Department Breakdown with One-Click Count Filter */}
        <DepartmentBreakdown
          departments={farmDepartments}
          employees={employees}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={handleDepartmentChange}
        />

        {/* 4. Search & Filter Bar with View Mode Toggle */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={handleDepartmentChange}
          departments={farmDepartments}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filteredCount={filteredEmployees.length}
          totalCount={employees.length}
        />

        {/* 5. Directory Content: Conditional Rendering */}
        <section className="directory-listing container">
          {filteredEmployees.length === 0 ? (
            /* Empty State Conditional Rendering */
            <div className="empty-state-card">
              <div className="empty-icon">🌾</div>
              <h3 className="empty-title">No Farm Employees Found</h3>
              <p className="empty-text">
                {employees.length === 0
                  ? 'Your directory is currently empty. Start by adding your first employee.'
                  : `No employees matched your current search "${searchQuery}" or department filter.`}
              </p>
              <div className="empty-actions">
                {employees.length === 0 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    + Add First Employee
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={handleResetFilters}
                  >
                    Reset All Filters ↺
                  </button>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={handleResetDemoData}
                >
                  Reload Demo Data 📦
                </button>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            /* Cards Grid View */
            <div className="employee-grid">
              {filteredEmployees.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteModal}
                />
              ))}
            </div>
          ) : (
            /* Table View */
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          )}
        </section>

        {/* Quick Demo Utilities Footer */}
        <footer className="farm-footer container">
          <div className="footer-inner">
            <span className="footer-copy">
              GreenHarvest Farm Management System &bull; React State &amp; Events Assignment
            </span>
            <button
              type="button"
              className="footer-reset-link"
              onClick={handleResetDemoData}
              title="Restores original dataset"
            >
              🔄 Reset to Default Demo Data
            </button>
          </div>
        </footer>
      </main>

      {/* 6. MODALS: Conditional Rendering */}
      
      {/* Add / Edit Employee Modal */}
      {(isAddModalOpen || Boolean(editingEmployee)) && (
        <EmployeeModal
          key={editingEmployee ? editingEmployee.id : 'add-modal'}
          isOpen={true}
          onClose={handleCloseModal}
          onSave={handleSaveEmployee}
          employeeToEdit={editingEmployee}
          departments={farmDepartments}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingEmployee)}
        employee={deletingEmployee}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingEmployee(null)}
      />

      {/* Feedback Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
