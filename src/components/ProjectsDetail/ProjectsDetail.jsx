import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import FilterDrawer from '../Filter/FilterDrawer';
import './projectsDetail.css';
import Pagination from '../Pagination/Pagination.jsx';
import ImportExport from '../ImportExport/ImportExport.jsx';
import * as XLSX from 'xlsx'; // Import the XLSX module here

Modal.setAppElement('#root');

function ProjectsDetail({ darkMode }) {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    leader: '',
    team: '',
    budget: '',
    status: 'Activate',
  });

  const [editing, setEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    setFilteredProjects(projects.slice(indexOfFirstProject, indexOfLastProject));
  }, [currentPage, projects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const handleStatusChange = (id, status) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, status } : project
      )
    );
  };

  const addProject = (e) => {
    e.preventDefault();
    const newId = '_' + Math.random().toString(36).substr(2, 9);
    setProjects([...projects, { ...newProject, id: newId }]);
    setNewProject({
      name: '',
      client: '',
      leader: '',
      team: '',
      budget: '',
      status: 'Activate',
    });
    setModalIsOpen(false);
  };

  const editProject = (project) => {
    setEditing(true);
    setCurrentProject(project);
    setModalIsOpen(true);
  };

  const updateProject = (e) => {
    e.preventDefault();
    setEditing(false);
    setProjects(projects.map((project) =>
      project.id === currentProject.id ? currentProject : project
    ));
    setModalIsOpen(false);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(projects);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projects');
    XLSX.writeFile(wb, 'projects.xlsx');
  };

  const handleImport = (importedData) => {
    setProjects(importedData);
  };

  const applyFilters = (filters) => {
    console.log('Filters received:', filters); // Debugging line
    const filtered = projects.filter((project) => {
      return (
        (filters.name ? project.name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
        (filters.leader ? project.leader.toLowerCase().includes(filters.leader.toLowerCase()) : true) &&
        (filters.team ? project.team.toLowerCase().includes(filters.team.toLowerCase()) : true) &&
        (filters.budget ? project.budget.toLowerCase().includes(filters.budget.toLowerCase()) : true) &&
        (filters.status === 'All' ? true : project.status === filters.status) &&
        (filters.client ? project.client.toLowerCase().includes(filters.client.toLowerCase()) : true)
      );
    });
    console.log('Filtered projects:', filtered); // Debugging line
    setFilteredProjects(filtered);
  };
  
  

  return (
    <div className={`projects mb-4 ml-10 ${darkMode ? 'projects-detail-dark' : 'projects-detail-light'}`}>
      <div className="projects-inner">
        <ImportExport
          projects={projects}
          onImport={handleImport}
          onExport={handleExport}
        />
        <header className="projects-header">
          <div className="title">Ongoing Projects</div>
          <div className="count">| {projects.length} Projects</div>
          <button onClick={() => setFilterOpen(true)} className="filter-btn"><FaFilter /> Filter</button>
          <i className="zmdi zmdi-download" />
        </header>
        <table className={`projects-table ${darkMode ? 'projects-table-dark' : 'projects-table-light'}`}>
          <thead>
            <tr>
              <th>Project</th>
              <th>Leader + Team</th>
              <th>Budget</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>
                  <p className="newDashboard">{project.name}</p>
                  <p>{project.client}</p>
                </td>
                <td className="member">
                  <div className="member-info">
                    <p className="name">{project.leader}</p>
                    <p>{project.team}</p>
                  </div>
                </td>
                <td>
                  <p className="budget">{project.budget}</p>
                  <p>Paid</p>
                </td>
                <td className="status">
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                    className={`status-dropdown ${project.status === 'Activate' ? 'status-orange' : 'status-red'}`}
                  >
                    <option value="Activate">Activate</option>
                    <option value="DeActivate">DeActivate</option>
                  </select>
                </td>
                <td className="actions">
                  <button onClick={() => editProject(project)} className='edit'><FaEdit /></button>
                  <button onClick={() => deleteProject(project.id)} className='delete'><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(projects.length / projectsPerPage)}
          onPageChange={setCurrentPage}
        />
        <button onClick={() => setModalIsOpen(true)} className='addProj'><FaPlus /> Add Project</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel={editing ? "Edit Project" : "Add Project"}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="modal-header">
            <h2>{editing ? "Edit Project" : "Add New Project"}</h2>
            <button onClick={() => setModalIsOpen(false)} className='closeModel'>X</button>
          </div>
          <div className="modal-body">
            <form onSubmit={editing ? updateProject : addProject}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editing ? currentProject.name : newProject.name}
                onChange={editing ? handleEditInputChange : handleInputChange}
                required
              />
              <label>Client</label>
              <input
                type="text"
                name="client"
                value={editing ? currentProject.client : newProject.client}
                onChange={editing ? handleEditInputChange : handleInputChange}
                required
              />
              <label>Leader</label>
              <input
                type="text"
                name="leader"
                value={editing ? currentProject.leader : newProject.leader}
                onChange={editing ? handleEditInputChange : handleInputChange}
                required
              />
              <label>Team</label>
              <input
                type="text"
                name="team"
                value={editing ? currentProject.team : newProject.team}
                onChange={editing ? handleEditInputChange : handleInputChange}
                required
              />
              <label>Budget</label>
              <input
                type="text"
                name="budget"
                value={editing ? currentProject.budget : newProject.budget}
                onChange={editing ? handleEditInputChange : handleInputChange}
                required
              />
              <label>Status</label>
              <select
                name="status"
                value={editing ? currentProject.status : newProject.status}
                onChange={editing ? handleEditInputChange : handleInputChange}
              >
                <option value="Activate">Activate</option>
                <option value="DeActivate">DeActivate</option>
              </select>
              <button type="submit" className='saveBtn'>Save</button>
            </form>
          </div>
        </Modal>
      </div>
      <FilterDrawer 
  isOpen={filterOpen} 
  onClose={() => setFilterOpen(false)} 
  onFilter={applyFilters} 
/>

    </div>
  );
}

export default ProjectsDetail;
