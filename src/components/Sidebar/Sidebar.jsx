import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css'
import axios from 'axios';
import ProjectsDetail from '../ProjectsDetail/ProjectsDetail';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('../../../src/projectData.json').then((response)=>{
      setData(response.data)
    })
  }, [])

  

  return (
    <div className="main" id="main">
      <div className="left" style={{ marginTop: '-7.1%' }}>
        <ul>
          <li className="menu-heading">Dashboard</li>

          <li id="menu-item3">
            <Link to="#scheme" onClick={() => setActiveTab('scheme')}>
              <i className="fa fa-th"></i> Scheme
            </Link>
          </li>

          <li id="menu-item1">
            <Link
              to="#"
              className="toggle-custom"
              data-toggle="collapse"
              data-target="#submenu1"
              aria-expanded="false"
            >
              <span className="glyphicon glyphicon-plus" aria-hidden="true">
                <i className="fa fa-home fa-lg"></i> General Settings
                <i id="fa1" className="fa fa-arrow-right" aria-hidden="true"></i>
              </span>
            </Link>
            <ul className="nav collapse" id="submenu1" role="menu">
              <li>
                <Link to="#">
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                  General Link
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                  General Link 2
                </Link>
              </li>
            </ul>
          </li>

          <li id="menu-item4">
            <Link to="#staff" onClick={() => setActiveTab('manageStaff')}>
              <i className="fa fa-user-cog fa-lg"></i> Manage Staffs
            </Link>
          </li>

          <li id="menu-item4">
            <Link to="#landing" onClick={() => setActiveTab('manageRoles')}>
              <i className="fa fa-user-shield fa-lg"></i> Manage Roles
            </Link>
          </li>
        </ul>
      </div>

      <div className="right">
        {/* <div className="tab-content">
          <div className="tab-pane fade show active" id="overview">
            <div className="container">
              <h1 className="my-4">Dashboard</h1>
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card card-1 h-100 bg-primary">
                    <div className="card-body">
                      <h4 className="card-title">
                        <Link to="#" className="card-title">Projects</Link>
                      </h4>
                      {data ? (
                        <p className="card-text">
                          Total: {data.projects.total}<br />
                          Change: {data.projects.change}
                        </p>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                    <div className="card-footer">
                      <Link to="#" className="btn btn-success">Learn More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card card-2 h-100 bg-secondary">
                    <div className="card-body">
                      <h4 className="card-title">
                        <Link to="#" className="card-title">Team Members</Link>
                      </h4>
                     {data ? (
                      <p className='card-text'>
                      Total: {data.teamMembers.total}<br />
                      Changes: {data.teamMembers.change}
                      </p>
                     ):(
                      <p>Loading...</p>
                     )}
                    </div>
                    <div className="card-footer">
                      <Link to="#" className="btn btn-success">Learn More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card card-3 h-100 bg-warning">
                    <div className="card-body">
                      <h4 className="card-title">
                        <Link to="#" className="card-title">Total Budget</Link>
                      </h4>
                      {data ? (
                      <p className='card-text'>
                      Total: {data.totalBudget.amount}<br />
                      Changes: {data.totalBudget.change}
                      </p>
                     ):(
                      <p>Loading...</p>
                     )}
                    </div>
                    <div className="card-footer">
                      <Link to="/" className="btn btn-success">Learn More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card card-4 h-100 bg-info">
                    <div className="card-body">
                      <h4 className="card-title">
                        <Link to="#" className="card-title">New Customers</Link>
                      </h4>
                      {data ? (
                      <p className='card-text'>
                      Total: {data.newCustomers.total}<br />
                      Changes: {data.newCustomers.change}
                      </p>
                     ):(
                      <p>Loading...</p>
                     )}
                    </div>
                    <div className="card-footer">
                      <Link to="/myComponent" className="btn btn-success">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {activeTab === 'scheme' && (
            <div className="tab-pane fade show active Data" id="scheme">
              <h2>Scheme Content</h2>
            </div>
          )}
          {activeTab === 'manageStaff' && (
            <div className="tab-pane fade show active Data" id="manageStaff">
              <h2>Manage Staff</h2>
            </div>
          )}
          {activeTab === 'manageRoles' && (
            <div className="tab-pane fade show active Data" id="statistics">
              <h2>Manage Roles</h2>
            </div>
          )}
        </div> */}
      <ProjectsDetail />
      </div>
    </div>
  );
};

export default Sidebar;