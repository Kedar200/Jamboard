import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JamCard.css';

function JamCard({ canvas }) {
  const navigate = useNavigate();

  const handleJamClick = () => {
    navigate(`/jamboard/${canvas._id}`, { state: canvas });
  };

  return (
    <div className="jam-card" onClick={handleJamClick}>
      <div className="jam-drawing">
        <img src={canvas.background} alt="Drawing" />
      </div>
      <div className="jam-info">
        <h3>{canvas._id}</h3>
        <p>
          <strong>Created By:</strong> {canvas.createdBy.name}
        </p>
      </div>
    </div>
  );
}

export default JamCard;
