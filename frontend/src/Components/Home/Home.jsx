import React from 'react';
import { useNavigate } from 'react-router-dom';
import Jams from './Jams';
import './Home.css';

function Home() {

  const handleAddJam = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://jamboard.onrender.com/canvas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to create jamboard');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error creating jamboard:', error);
    }
  };

  return (
    <div className="home-container">
      <Jams />
      <button className="new-jamboard-button" onClick={handleAddJam}>
        New Jamboard
      </button>
    </div>
  );
}

export default Home;
