import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/user.routes.js";
import roomRoutes from "./routes/room.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server started on port ${PORT}`);
});
