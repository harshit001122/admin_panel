import React, { useState } from 'react';
import './filterDrawer.css';

function FilterDrawer({ isOpen, onClose, onFilter }) {
  const [filters, setFilters] = useState({
    name: '',
    leader: '',
    team: '',
    budget: '',
    status: 'All',
    client: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    const hasFilters = Object.values(filters).some((value) => value !== '' && value !== 'All');
    
    if (hasFilters) {
      onFilter(filters);
      onClose();
    } else {
      alert('Please provide at least one filter.');
    }
  };

  return (
    <div className={`filter-drawer ${isOpen ? 'open' : ''}`}>
  <div className="filter-drawer-header">
    <h2>Filter Projects</h2>
    <button onClick={onClose}>X</button>
  </div>
  <div className="filter-drawer-body">
    <label>Project Name</label>
    <input
      type="text"
      name="name"
      value={filters.name}
      onChange={handleInputChange}
    />
    <label>Leader</label>
    <input
      type="text"
      name="leader"
      value={filters.leader}
      onChange={handleInputChange}
    />
    <label>Team</label>
    <input
      type="text"
      name="team"
      value={filters.team}
      onChange={handleInputChange}
    />
    <label>Budget</label>
    <input
      type="text"
      name="budget"
      value={filters.budget}
      onChange={handleInputChange}
    />
    <label>Status</label>
    <select
      name="status"
      value={filters.status}
      onChange={handleInputChange}
    >
      <option value="All">All</option>
      <option value="Activate">Activate</option>
      <option value="DeActivate">DeActivate</option>
    </select>
    <label>Client</label>
    <input
      type="text"
      name="client"
      value={filters.client}
      onChange={handleInputChange}
    />
    <button onClick={handleFilter}>Apply Filters</button>
  </div>
</div>

  );
}

export default FilterDrawer;
