import { useState } from 'react';
import './Toolbar.css'
import { Tooltip } from '../../utils/Tooltip';


const Toolbar = ({ setSelectedTool, selectedTool }) => {
  const handlePencilClick = () => {
      setSelectedTool('pencil');
      console.log('Selected tool: pencil');
  };

  const handleEraserClick = () => {
      setSelectedTool('eraser');
      console.log('Selected tool: eraser');
  };

  const handlePointerClick = () => {
      setSelectedTool('pointer');
      console.log('Selected tool: pointer');
  };

  const handleHighlighterClick = () => {
      setSelectedTool('highlighter');
      console.log('Selected tool: highlighter');
  };

  return (
    <div className="toolbar">
    <Tooltip text="Pen">
        <div>
      <button
        className={`toolbar-button ${selectedTool === 'pencil' ? 'selected' : ''}`}
        onClick={handlePencilClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
          <path fill="none" d="M24 0v24H0V0h24z"></path>
          <path d="M3 17.25V21h3.74l7.54-7.53-3.75-3.75L3 17.25zM18.37 3.3l2.34 2.33c.39.39.4 1.03.01 1.42l-5.37 5.36-3.76-3.76 2.53-2.53-.73-.73-5.66 5.66-1.4-1.4 6.37-6.36c.39-.39 1.04-.38 1.42.01l1.42 1.41 1.42-1.41c.38-.39 1.02-.39 1.41 0z"></path>
        </svg>
      </button>
      <div className="pen-right-arrow">
        &nbsp;
      </div>
      </div>
    </Tooltip>

    <Tooltip text="Eraser">
      <button
        className={`toolbar-button ${selectedTool === 'eraser' ? 'selected' : ''}`}
        onClick={handleEraserClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
          <path fill="none" d="M24 0v24H0V0h24z"></path>
          <path d="M17.26 18l-2 2h6.7v-2h-4.7zm4.15-6.67L13.04 20H4.73l-2.15-2.14c-.78-.78-.78-2.03 0-2.82L13.62 3.58c.78-.77 2.06-.77 2.84 0l4.95 4.93c.79.78.79 2.04 0 2.82z"></path>
        </svg>
      </button>
    </Tooltip>

    <Tooltip text="Pointer">
      <button
        className={`toolbar-button ${selectedTool === 'pointer' ? 'selected' : ''}`}
        onClick={handlePointerClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" d="M24 0v24H0V0h24z"></path>
          <polygon points="12.926 12 17.5 20 15 21.5 10.405 13.595 6 18 6 2 19 12"></polygon>
        </svg>
      </button>
    </Tooltip>

    <Tooltip text="Text">
      <button className="toolbar-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M20,16V4H4v16h12v-2c0-1.1,0.9-2,2-2H20z M4,2h16c1.1,0,2,0.9,2,2v13l-5,5H4c-1.1,0-2-0.9-2-2V4 C2,2.9,2.9,2,4,2z M7,8h10v2H7V8z M7,12h6v2H7V12z"></path>
        </svg>
      </button>
    </Tooltip>

    <Tooltip text="Shape">
      <button className="toolbar-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
      </button>
    </Tooltip>

    <Tooltip text="Circle">
      <button className="toolbar-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" d="M24 0v24H0V0h24z"></path>
          <path
            strokeWidth="1"
            d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z"
          ></path>
        </svg>
      </button>
    </Tooltip>

    <Tooltip text="Square">
      <button className="toolbar-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
          <path
            d='M8.98,13l-3.99,3c-1,0.88-1.13,2.12-1,3c0.14,0.99,0.92,2.22,2.01,2.68c1.57,0.67,3.09,0.22,4.04-0.76L18.98,13 c1.88-1.38,1-4-1-4h-5.96l7.44-4.39c0.44-0.32,0.62-0.79,0.6-1.24C20.01,2.67,19.46,2,18.6,2c-0.02,0-0.04,0-0.06,0 c-0.35,0.01-0.68,0.11-0.98,0.29L4.99,9c-0.8,0.46-1.05,1.24-1,2c0.06,1.03,0.75,2,2.01,2 M4.99,18.5c0-1.38,1.13-2.5,2.51-2.5 s2.51,1.12,2.51,2.5S8.88,21,7.5,21S4.99,19.88,4.99,18.5z'
            Style='user-select: none;'
          ></path>
        </svg>
      </button>
    </Tooltip>

    <Tooltip text="Laser">
      <button className={`toolbar-button ${selectedTool === 'laser' ? 'selected' : ''}`} onClick={handleHighlighterClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" d="M24 0v24H0V0h24z"></path>
          <path
            d='M8.98,13l-3.99,3c-1,0.88-1.13,2.12-1,3c0.14,0.99,0.92,2.22,2.01,2.68c1.57,0.67,3.09,0.22,4.04-0.76L18.98,13 c1.88-1.38,1-4-1-4h-5.96l7.44-4.39c0.44-0.32,0.62-0.79,0.6-1.24C20.01,2.67,19.46,2,18.6,2c-0.02,0-0.04,0-0.06,0 c-0.35,0.01-0.68,0.11-0.98,0.29L4.99,9c-0.8,0.46-1.05,1.24-1,2c0.06,1.03,0.75,2,2.01,2 M4.99,18.5c0-1.38,1.13-2.5,2.51-2.5 s2.51,1.12,2.51,2.5S8.88,21,7.5,21S4.99,19.88,4.99,18.5z'
            Style='user-select: none;'
          ></path>
        </svg>
      </button>
    </Tooltip>
  </div>
  )
}

export default Toolbar
