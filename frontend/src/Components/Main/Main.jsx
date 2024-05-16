import React, { useState } from 'react';
import Toolbar from './Toolbar.jsx';
import Canvas from './Canvas.jsx';
import './Main.css';

const Main = () => {
    const [cursor, setCursor] = useState('default');

    return (
        <div className="main">
            <Navbar />
            <div className="content">
                <Toolbar setCursor={setCursor} />
                <div className="canvas-container">
                    <Canvas cursor={cursor} />
                </div>
            </div>
        </div>
    );
};

export default Main;
