import React from 'react';
import { useNavigate } from 'react-router-dom';
import Jams from './Jams';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleAddJam = () => {
    navigate('/Main');
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