import React, { useState } from 'react';
import Toolbar from './Toolbar.jsx';
import Canvas from './Canvas.jsx';
import './Main.css';
import { useLocation } from 'react-router-dom';

const Main = () => {
    const {state}=useLocation();
    const [selectedTool, setSelectedTool] = useState("pointer");
    return (
        <div className="main">
            <div className="content">
            <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
                <div className="canvas-container">
                <Canvas url={state.drawing} id={state._id} setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
                </div>
            </div>
        </div>
    );
};

export default Main;
