import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT||5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);
app.use('/api/message',messageRouter);


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🔥 New client connected:", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on("sendMessage", (messageData) => {
    const { chatId, message } = messageData;
    socket.to(chatId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});