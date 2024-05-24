const WebSocket = require('ws');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserRoutes = require('./routes/UserRoutes');
const CanvasRoutes = require('./routes/CanvasRoutes');


const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);

            // Broadcast drawing data to all connected clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
            console.log('Received:', message);

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

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', UserRoutes);
app.use('/canvas', CanvasRoutes);

app.listen(4000, () => {
    console.log('Express server is running on http://localhost:4000');
});

const mongoURL = 'mongodb+srv://jamboard:jamboard@jamboard.hg47v2o.mongodb.net/?retryWrites=true&w=majority&appName=jamboard';
mongoose.connect(mongoURL)
    .then(() => console.log('connected to mongodb'))
    .catch((err) =>
    console.log('error connecting to mongodb', err))

