import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';

const port = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both frontend ports
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.IO middleware to authenticate and set project ID
io.use(async (socket, next) => {
  try {
    const projectId = socket.handshake.query.projectId;
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(' ')[1];

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error('Invalid project ID'));
    }

    const project = await projectModel.findById(projectId);
    if (!project) return next(new Error('Project not found'));

    if (!token) return next(new Error('Authentication error'));

    const decoded = jwt.verify(token, 'krishna');
    if (!decoded) return next(new Error('Authentication error'));

    socket.project = project;
    socket.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return next(new Error('Socket authentication error'));
  }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user?.email}`);

  // Join the project room
  const roomId = socket.projects._id.toString();
  socket.join(roomId);
  console.log(`User ${socket.user?.email} joined room: ${roomId}`);

  // Handle project messages
  socket.on('project-message', (data) => {
    console.log(`Received message from ${socket.user?.email}:`, data);

    // Broadcast the message to all users in the room
    io.to(roomId).emit('project-message', {
      ...data,
      sender: socket.user,
    });

    console.log(`Message broadcasted to room: ${roomId}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user?.email}`);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
