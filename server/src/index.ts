import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './db';


import userRoutes from './routes/userRoutes';

// Create a Hono app
const app = new Hono()

dotenv.config();
connectDB();

// Test route
app.get('/', (c) => {
  return c.text('Hono is working!');
});


// mount routes
app.route('/users', userRoutes);


// Create an HTTP server
const server = serve({
  fetch: app.fetch,
  port: 3000,
});

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages
  socket.on('chat message', (msg) => {
    console.log(`Received message from ${socket.id}:`, msg);
    io.emit('chat message', msg); // Broadcast to all clients
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

console.log('Server is running on http://localhost:3000');


export { io };



