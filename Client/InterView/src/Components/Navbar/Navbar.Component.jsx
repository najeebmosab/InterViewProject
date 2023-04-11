import { useState } from "react";
import "./Navbar.Component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate()
  const toggleNavbar = () => {
    setActive(!isActive);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <nav className={`navbar ${isActive ? 'active' : ''}`}>
        <div className="navbar-header">
          <div className="logo">Logo</div>
          <div className="hamburger" onClick={toggleNavbar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <a onClick={logout} className="nav-link"><FontAwesomeIcon icon={faRightFromBracket} /></a>
            </li>

          </ul>
        </div>
      </nav>
      <Outlet></Outlet>
    </>

  );
}

export { Navbar };
