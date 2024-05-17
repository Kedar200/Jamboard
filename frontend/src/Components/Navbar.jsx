import React from 'react';
import './Navbar.css';
import logo from './logo.svg';

const Navbar = () => {
    const getCurrentDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        return today.toLocaleDateString('en-US', options);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Jamboard Logo" className="navbar-logo-image" />
                Jamboard
            </div>
            <div className="navbar-date">
                {getCurrentDate()}
            </div>
        </nav>
    );
};

export default Navbar;
