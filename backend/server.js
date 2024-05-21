const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        try {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === 'drawing') {
                // Broadcast drawing data to all connected clients
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            }
        } catch (e) {
            console.error('Error parsing message:', e);
        }
    });

    ws.on('close', (code, reason) => {
        console.log(`Client disconnected: ${code} ${reason}`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});

console.log('WebSocket server is running on ws://localhost:5000');