import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';
import './Navbar.css';
import logo from './Logo.png';
import userIcon from './userIcon.jpg';



const Navbar = ({ isAuthenticated, onLogout }) => {
  const [jamTitle, setJamTitle] = useState("Untitled Jamboard");
  const [newJamTitle, setNewJamTitle] = useState(jamTitle);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleTitleChange = (event) => {
    setNewJamTitle(event.target.value);
  };

  const openModal = () => {
    setNewJamTitle(jamTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveTitle = () => {
    setJamTitle(newJamTitle);
    closeModal();
  };

  const isMainPage = location.pathname.startsWith('/jamboard/');


  // implementation part(left)
  const handleClearFrame = () => {
    // Logic to clear the frame
    console.log("Frame cleared");
  };


  // implementation part(left)
  const handleSetBackground = (color) => {
    // Logic to set the background
    console.log("Background set to", color);
    setIsColorPickerOpen(false);
  };

  const openColorPicker = () => {
    setIsColorPickerOpen(true);
  };

  const closeColorPicker = () => {
    setIsColorPickerOpen(false);
  };

  const colorOptions = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#33FFF3"];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Jamboard Logo" className="navbar-logo-image" />
          </Link>
          {isMainPage && (
            <div className="navbar-title" onClick={openModal}>
              <input
                type="text"
                value={jamTitle}
                readOnly
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

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Rename the Jam</h2>
            <input
              type="text"
              value={newJamTitle}
              onChange={handleTitleChange}
              className="modal-title-input"
            />
            <div className="modal-buttons">
              <button onClick={saveTitle} className="modal-button">Ok</button>
              <button onClick={closeModal} className="modal-button">Cancel</button>
            </div>
          </Modal>
        )}
      </nav>

      {isMainPage && (
        <nav className="secondary-navbar">
          <button onClick={handleClearFrame} className="secondary-navbar-button">Clear Frame</button>
          <button onClick={openColorPicker} className="secondary-navbar-button">Set Background</button>
          {isColorPickerOpen && (
            <div className="color-picker-dropdown">
              {colorOptions.map(color => (
                <div
                  key={color}
                  className="color-option"
                  style={{ backgroundColor: color }}
                  onClick={() => handleSetBackground(color)}
                ></div>
              ))}
              <button onClick={closeColorPicker} className="color-picker-close-button">Close</button>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
