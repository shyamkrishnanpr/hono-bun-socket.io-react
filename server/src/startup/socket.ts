import { serve } from "@hono/node-server";
import { Server } from "socket.io";
import type { Hono } from "hono";

let io: Server;
export default function setupSocket(app: Hono) {
	// Create an HTTP server
	const server = serve({
		fetch: app.fetch,
		port: 3000,
	});
	// Initialize Socket.IO
	io = new Server(server, {
		cors: {
			origin: "http://localhost:5173",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log("A user connected:", socket.id);

		// Listen for messages
		socket.on("chat message", (msg) => {
			console.log(`Received message from ${socket.id}:`, msg);
			io.emit("chat message", msg); // Broadcast to all clients
		});

		// Handle disconnect
		socket.on("disconnect", () => {
			console.log("User disconnected:", socket.id);
		});
	});
}

export { io };
