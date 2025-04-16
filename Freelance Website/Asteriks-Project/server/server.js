import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';

import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
	cors: {
		origin: 'localhost:5173',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);

	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`);
	});
});

// DB & Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('✅ MongoDB connected');
		server.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => console.error('MongoDB error:', err));
