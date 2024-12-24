import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import socket from "./socket/socketIO.js";
socket(io);
import authRoutes from "./router/auth.js";
import businessRoutes from "./router/business.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

const server = http.createServer(app);
const io = new Server(server);

app.use("/auth", authRoutes);
app.use("/businesses", businessRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
