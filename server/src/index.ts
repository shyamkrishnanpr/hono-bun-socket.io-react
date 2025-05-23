import { Hono } from "hono";
import dotenv from "dotenv";
import connectDB from "./startup/db";
import setupRoutes from "./startup/routes";
import setupSocket from "./startup/socket";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

// Create a Hono app
const app = new Hono();

dotenv.config();

// Test route
app.get("/api/v1", (c) => {
	return c.text("Hono is working!");
});

// Connect to the database
connectDB();
// mount application routes
setupRoutes(app);
// setup socket.io
setupSocket(app);



// Error Handler (improved to use err)
app.onError(errorHandler);

// Not Found Handler (standardized response)
app.notFound(notFound);

console.log("Server is running on http://localhost:3000");
