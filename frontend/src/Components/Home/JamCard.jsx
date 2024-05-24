import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JamCard.css';

function JamCard({ jam }) {
  const navigate = useNavigate();

  const handleJamClick = () => {
    navigate(`/jamboard/${jam.id}`, { state: jam });
  };

  return (
    <div className="jam-card" onClick={handleJamClick}>
      <div className="jam-drawing">
        <img src={jam.drawing} alt="Drawing" />
      </div>
      <div className="jam-info">
        <h3>{jam.title}</h3>
        <p>
          <strong>Created Date:</strong> {jam.date}
        </p>
        <p>
          <strong>Last Edit Date:</strong> {jam.editedDate}
        </p>
      </div>
    </div>
  );
}

export default JamCard;