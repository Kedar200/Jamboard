import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Main from '../Main/Main';

function Jamboard() {
  const { id } = useParams();
  const { state } = useLocation();
  const jam = state;
  return (
    <div>
      {/* <h1>Jamboard</h1>
      <p>Jamboard ID: {id}</p> */}
      {jam && (
        <>
          {/* <h2>{jam.title}</h2>
          <p>
            <strong>Created Date:</strong> {jam.date}
          </p>
          <p>
            <strong>Last Edit Date:</strong> {jam.editedDate}
          </p>
          <div>
            <img src={jam.drawing} alt="Drawing" />
          </div> */}
          <Main drawinglayer={jam.drawing}/>
        </>
      )}
    </div>
  );
}

export default Jamboard;