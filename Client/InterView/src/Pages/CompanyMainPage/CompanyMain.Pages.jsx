import React from 'react';
import {Sidebar} from "../../Components/SidebarPage/Sidebar.Pages";

// import Sidebar from './Sidebar';
import "./CompanyMain.Pages.css";
import { Outlet } from 'react-router-dom';
function CompanyMain() {
  return (
    <div className="company-main">
      <Sidebar />
      <Outlet></Outlet>
    </div>
  );
}

export { CompanyMain};
