import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import createError from "http-errors";
import connectDB from "./services/database.js";
import http from "http";
import routes from "./routers/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();

const app = express();
//test
// Enable CORS with specific options for your frontend origins
const allowedOrigins = [
  "https://demo-ticket-ten.vercel.app", // Production frontend
  "http://localhost:3000", // Local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

// Add JSON parsing middleware at the start for all incoming requests
app.use(json());

const port = process.env.PORT || 9999;

// Connect to the database before starting the server
connectDB();

// Create HTTP and WebSocket servers
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins, // Allow the same origins for WebSocket connections
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log("Received message:", msg);
    io.emit("message", msg);
  });
  socket.on("joinRoom", (userId) => {
    socket.join(`user:${userId}`);
  });
  socket.on("joinProject", (projectId) => {
    socket.join(`project:${projectId}`);
  });
  socket.on("joinClass", (classId) => {
    socket.join(`class:${classId}`);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//route
app.use("/api/clientSave", routes.clientSaveRouter);
app.use("/api/tickets", routes.ticketRouter);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  next(createError(404, "Resource not found"));
});

// Custom error handling middleware
app.use(errorMiddleware);

// Global error handler for unhandled errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
