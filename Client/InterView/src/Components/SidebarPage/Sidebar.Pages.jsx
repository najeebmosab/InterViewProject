import React from 'react';
import './Sidebar.Pages.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li>
          <a href="/users">Users</a>
        </li>
        <li>
          <a href="/exams">Exams</a>
        </li>
      </ul>
      <div className="navbar-toggle">
        <i className="fa fa-bars"></i>
      </div>
    </div>
  );
};

export { Sidebar };
