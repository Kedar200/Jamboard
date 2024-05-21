    import React, { useRef, useEffect, useState } from 'react';
    import './Canvas.css';

    const Canvas = ({ selectedTool ,setSelectedTool}) => {


        const getCursorStyle = () => {
            switch (selectedTool) {
                case 'pencil':
                    return !isDrawing?'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAwFBMVEUAAAD///+hoqOorKzj4+Pl5ubk5OTn5+iqq6uurrL////g4ODGx8itrrDu7u60tbZ3enx4eny0trbu7+/z8/Okpaejpaby8vP///+1trfg4OF3enx4e33g4uLFxsjGyMmtr7Ctr7Cur7HHyMnh4eJ4e33g4eG1trikpqekpafz8/Lv7++0trd4en20trfv7/Df4ODGx8jf3+BVWFtLT1FVWVtTVlk6PkE7P0JTV1k8QENLTlFLT1JVWVxTV1oAAABkRxW0AAAAM3RSTlMAAAAAAAAAAAAAEViVuS+r7/CsLi7Kyi4Qq1jw8FiVlbi5uJRY71eqyskuLqvvqi1XlFfwBlS2AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+MEBAcVE5CiQ1QAAACRSURBVAjXTc5nD4IwFIXhU7dQxIFaFAX3nrS0dfD/f5YNSvB+e5KbnBcAsWzqONS2CAxKLbcdcy463V6ZoOL1EymVklIPhlUwV8tHdjLxGUbjn4yDCaZxQRHCeaqc6hVhxv84BxXF83uBZVBwtQbz03xIbxhq3lZ/M9Ldvg7SOBxPwkQG50szq2ZXGkW3OzP4AEA8H1WamC2AAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA0LTA0VDExOjIxOjE5LTA0OjAwHnWHYQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNC0wNFQxMToyMToxOS0wNDowMG8oP90AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC) 7 7,crosshair':'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAyVBMVEUAAAD///+oqKmwsbLq6uvu7u/r6+vv7/CztLW2t7f////p6urX2NjCxMTX19j////z8/PJysqOkJJiZWhTVlpjZWiOkJLIycrz8/T29va7vL1fYmU5PEA5PEA6PUG6u7319fXJycpgYmU8P0M4O0DJysuOj5Hq6urW19jY2NjCw8RTVllUVlrDxMXDxMVUV1rExcbX2NiPkJKPkZPq6ur///9gYmY4PEBgYmXKystgY2a7u7319fX09PTJysvY2NnY2Njp6uoAAAAND39hAAAAQnRSTlMAAAAAAAAAAAAAElOFm4URLpKtpqGnrpItLaWnmZiYpS6Sp5mYkq5ThYWboaGam6GahK6uUhCnmKiRp6QtLZGEhFLjJMWXAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+MEBAcVE5CiQ1QAAACWSURBVAjXTY/pFoFAAIXv2KkMaqKaCSVZypadwvu/FFIn9993zj13AUBakqwobYkSfKDU6fZUTWN6f1AmqBimxYVtC24NR1XQsSPcVBPLo5Cm3M3EdR8zVeQo2ByLpZ2jHYRYaQWuN5DZn3kLf1dERXscvOMpKzpfKGqG6fxmXG/3OkgjTnQWBCxK4ma6mkqPMHy+vhfeXXYWqIystokAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDQtMDRUMTE6MjE6MTktMDQ6MDAedYdhAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA0LTA0VDExOjIxOjE5LTA0OjAwbyg/3QAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=) 7 7,crosshair' ; // Use your own cursor image path
                case 'eraser':
                    return 'none'; // Use your own cursor image path
                case 'pointer':
                    return 'auto';
                case 'highlighter':
                    return 'url(/cursors/highlighter.cur), auto'; // Use your own cursor image path
                default:
                    return 'default';
            }
        };
        const canvasRef = useRef(null);
        const [isDrawing, setIsDrawing] = useState(false);
        const [points, setPoints] = useState([]);
        const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
        const pendingMessages = useRef([]);
        const socket = useRef(null);
        const reconnectAttempts = useRef(0);
        const cursorRef = useRef(null);

        const initializeWebSocket = () => {
            if (socket.current && socket.current.readyState !== WebSocket.CLOSED) {
                return;
            }

            socket.current = new WebSocket('wss://jamboard.onrender.com');

            socket.current.onopen = () => {
                console.log('Connected to WebSocket server');
                setIsWebSocketOpen(true);
                reconnectAttempts.current = 0;

               
            };

            socket.current.onmessage = async (event) => {
                try {
                    const data = event.data instanceof Blob ? await event.data.text() : event.data;
                    const message = JSON.parse(data);
                    if (message.type === 'drawing') {
                        const context = canvasRef.current.getContext('2d');
                        setSelectedTool(message.selectedTool)
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
            context.lineWidth = selectedTool === 'eraser' ? 10 : 1;
            context.lineCap = 'round';
            context.strokeStyle = selectedTool === 'eraser' ? 'white' : 'black';
    

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
                // console.log(canvas.toDataURL())
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
            const message = JSON.stringify({ type: 'drawing', points,selectedTool:selectedTool });
            if (isWebSocketOpen && socket.current && socket.current.readyState === WebSocket.OPEN) {
                socket.current.send(message);
            } else {
                pendingMessages.current.push(message);
            }
        };

        const drawFromData = (context, points, tool) => {
            context.beginPath();
            context.moveTo(points[0].x, points[0].y)
            
            if (tool === 'eraser') {
                context.globalCompositeOperation = 'destination-out';
                context.lineWidth = 20; // Eraser size
            } else {
                context.globalCompositeOperation = 'source-over';
                context.lineWidth = 1; // Pencil or other tool size
            }
        
            points.forEach(point => {
                context.lineTo(point.x, point.y);
            });
            context.stroke();
            context.closePath();
            context.globalCompositeOperation = 'source-over'; // Reset to default
        };
        const updateCursor = (event) => {
            if (cursorRef.current && selectedTool === 'eraser') {
                const { clientX, clientY } = event;
                requestAnimationFrame(() => {
                    cursorRef.current.style.left = `${clientX-5}px`;
                    cursorRef.current.style.top = `${clientY-5}px`;
                    cursorRef.current.style.display = 'block';
                });
            } else if (cursorRef.current) {
                cursorRef.current.style.display = 'none';
            }
        };
    
        const hideCursor = () => {
            if (cursorRef.current) {
                cursorRef.current.style.display = 'none';
            }
        };
    
        useEffect(() => {
            const canvas = canvasRef.current;
    
            canvas.addEventListener('mousemove', updateCursor);
            canvas.addEventListener('mouseout', hideCursor);
            
            return () => {
                canvas.removeEventListener('mousemove', updateCursor);
                canvas.removeEventListener('mouseout', hideCursor);
            };
        }, [selectedTool]);
        return (
            <>
            <canvas
                ref={canvasRef}
                width={1000}
                height={600}
                className="canvas"
                style={{ cursor:getCursorStyle() }}
            />
                        <div ref={cursorRef} className="custom-cursor" />

            </>
        );
    };

    export default Canvas;
