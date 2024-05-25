import React, { useState, useEffect } from 'react';
import JamCard from './JamCard';
import './Jams.css';

function Jams() {
  const [canvases, setCanvases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCanvases = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://jamboard.onrender.com/canvas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch canvases');
        }
        const data = await response.json();
        setCanvases(data.canvases);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCanvases();
  }, []);

  return (
    <div className="jams-container">
      <h1>Recent Jams</h1>
      {error && <p>{error}</p>}
      <div className="jams-grid">
        {canvases.map((canvas) => (
          <JamCard key={canvas._id} canvas={canvas} />
        ))}
      </div>
    </div>
  );
}

export default Jams;
