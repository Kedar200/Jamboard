const WebSocket = require('ws');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const UserRoutes = require('./routes/UserRoutes');
const CanvasRoutes = require('./routes/CanvasRoutes');

// Express Server
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/auth', UserRoutes);
app.use('/canvas', CanvasRoutes);

// Create HTTP server
const server = http.createServer(app);

// WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        try {
            const parsedMessage = JSON.parse(message);
            // Broadcast drawing data to all connected clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
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

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// MongoDB Connection
const mongoURL = 'mongodb+srv://jamboard:jamboard@jamboard.hg47v2o.mongodb.net/?retryWrites=true&w=majority&appName=jamboard';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));