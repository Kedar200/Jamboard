import React, { useRef, useEffect, useState } from 'react';
import './Canvas.css';

const Canvas = ({ cursor }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState([]);
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
    const pendingMessages = useRef([]);
    const socket = useRef(null);
    const reconnectAttempts = useRef(0);

    const initializeWebSocket = () => {
        if (socket.current && socket.current.readyState !== WebSocket.CLOSED) {
            return;
        }

        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            console.log('Connected to WebSocket server');
            setIsWebSocketOpen(true);
            reconnectAttempts.current = 0;

            // Send any pending messages
            while (pendingMessages.current.length > 0) {
                const message = pendingMessages.current.shift();
                socket.current.send(message);
            }
        };

        socket.current.onmessage = async (event) => {
            try {
                const data = event.data instanceof Blob ? await event.data.text() : event.data;
                const message = JSON.parse(data);
                if (message.type === 'drawing') {
                    const context = canvasRef.current.getContext('2d');
                    drawFromData(context, message.points);
                }
            } catch (e) {
                console.error('Error parsing WebSocket message:', e);
            }
        };

        socket.current.onclose = (event) => {
            console.log(`WebSocket closed: ${event.code} ${event.reason}`);
            setIsWebSocketOpen(false);
            const delay = Math.min(10000, 1000 * 2 ** reconnectAttempts.current);
            reconnectAttempts.current += 1;
            setTimeout(initializeWebSocket, delay);
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            socket.current.close();
        };
    };

    useEffect(() => {
        initializeWebSocket();

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineWidth = 1;
        context.lineCap = 'round';
        context.strokeStyle = 'green';

        const startDrawing = (event) => {
            const { offsetX, offsetY } = event.nativeEvent || event;
            context.beginPath();
            context.moveTo(offsetX, offsetY);
            setIsDrawing(true);
            setPoints([{ x: offsetX, y: offsetY }]);
        };

        const draw = (event) => {
            if (!isDrawing) return;
            const { offsetX, offsetY } = event.nativeEvent || event;
            context.lineTo(offsetX, offsetY);
            context.stroke();
            setPoints(prevPoints => {
                const newPoints = [...prevPoints, { x: offsetX, y: offsetY }];
                sendDrawingData(newPoints);
                return newPoints;
            });
        };

        const stopDrawing = () => {
            if (!isDrawing) return;
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

    const sendDrawingData = (points) => {
        const message = JSON.stringify({ type: 'drawing', points });
        if (isWebSocketOpen && socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(message);
        } else {
            pendingMessages.current.push(message);
        }
    };

    const drawFromData = (context, points) => {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        points.forEach(point => {
            context.lineTo(point.x, point.y);
        });
        context.stroke();
        context.closePath();
    };

    return (
        <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            className="canvas"
            style={{ cursor }}
        />
    );
};

export default Canvas;
