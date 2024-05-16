import React, { useState } from 'react'
import Toolbar from './Toolbar.jsx';
import Canvas from './Canvas.jsx';
import './Main.css'
const Main = () => {
    const [cursor, setCursor] = useState('default');

    return (
        <div className="main" style={{ cursor }}>
            <Toolbar setCursor={setCursor} />
            <Canvas />
        </div>
    );
};

export default Main