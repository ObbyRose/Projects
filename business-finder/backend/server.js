const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

// Initialize Socket.io
const server = http.createServer(app);
const io = new Server(server);

// Socket.io integration
require("./socket")(io);

// Routes
const authRoutes = require("./router/auth");
const businessRoutes = require("./router/business");

app.use("/auth", authRoutes);
app.use("/businesses", businessRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
