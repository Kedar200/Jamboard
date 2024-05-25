import React, { useEffect, useState } from 'react';
import Toolbar from './Toolbar.jsx';
import Canvas from './Canvas.jsx';
import './Main.css';
import { useParams } from 'react-router-dom';

const Main = () => {
    const { id } = useParams();
    const [selectedTool, setSelectedTool] = useState("pointer");
    const [canvas,setcanvas]=useState(null);
    const [error,setError]=useState();
    useEffect(() => {
        const fetchCanvases = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:4000/canvas/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch canvases');
            }
            const data = await response.json();
            console.log(data)
            setcanvas(data.canvas);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchCanvases();
      }, [error]);
      
    return (
        <div className="main">
            <div className="content">
            <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
                <div className="canvas-container">
                    {
                        canvas && 
                        <Canvas canvasdata={canvas} setSelectedTool={setSelectedTool} selectedTool={selectedTool} />  
                    }
                      
                </div>
            </div>
        </div>
    );
};

export default Main;
