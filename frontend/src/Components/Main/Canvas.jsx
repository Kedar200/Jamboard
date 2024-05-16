import React, { useRef, useEffect, useState } from 'react';
import './Canvas.css';

const Canvas = ({ cursor }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = 'black';

        const startDrawing = (event) => {
            const { offsetX, offsetY } = event.nativeEvent || event;
            context.beginPath();
            context.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        };

        const draw = (event) => {
            if (!isDrawing) return;
            const { offsetX, offsetY } = event.nativeEvent || event;
            context.lineTo(offsetX, offsetY);
            context.stroke();
        };

        const stopDrawing = () => {
            context.closePath();
            setIsDrawing(false);
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
        };
    }, [isDrawing]);

    return (
        <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            className="canvas"
            style={{ cursor }} // Apply cursor style
        />
    );
};

export default Canvas;
