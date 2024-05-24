import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from './Logo.png';
import userIcon from './userIcon.jpg';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [jamTitle, setJamTitle] = useState("Untitled Jam");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleTitleChange = (event) => {
    setJamTitle(event.target.value);
  };

  const isMainPage = location.pathname === '/Main';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Jamboard Logo" className="navbar-logo-image" />
        </Link>
        {isMainPage && (
          <div className="navbar-title">
            <input
              type="text"
              value={jamTitle}
              onChange={handleTitleChange}
              className="navbar-title-input"
            />
          </div>
        )}
      </div>
      <div className="navbar-actions">
        <div className="user-icon-container">
          <img src={userIcon} alt="User Icon" className="user-icon" />
          <div className="user-dropdown">
            {isAuthenticated && (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;