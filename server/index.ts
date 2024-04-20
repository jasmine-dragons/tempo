const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require('cors')
import router from "./api";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);
const port = process.env.PORT || 8000;

const io = new Server(server, {
  // options
});

io.on("connection", (socket) => {
  // ...
  console.log("connection started!");
});

dotenv.config();

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Connected to MongoDB database");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use("/", router);

server.listen(port, () => {
  console.log("Server started on port 8000!");
});
