import React from 'react';
import './Sidebar.Pages.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // const arr = ["/users","/CompanyMainPage"]
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li>
          <Link to="users">Users</Link>
        </li>
        <li>
          <Link to="/CompanyMainPage">Exams</Link>
        </li>
      </ul>
      <div className="navbar-toggle">
        <i className="fa fa-bars"></i>
      </div>
    </div>
  );
};

export { Sidebar };
