const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require('cors')
import router from "./api";
import { createServer } from "http";
import { Server } from "socket.io";

const { addUser, getUser, deleteUser, getUsers } = require("./users");

const server = createServer(app);
const port = process.env.PORT || 8000;


const io = new Server(server, {
  // options
  cors: {
    origin: "*"
  }
});

io.on("connect", (socket) => {
  // ...

  socket.on('player join', ( { name, room }) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error) return;
    socket.join(user.room);
    socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room`});
    io.in(room).emit('users', getUsers(room));
  });

  socket.on('game start', () => {

  });

  socket.on('round end', () => {
    
  });

  socket.on('judging', () => {

  });

  socket.on("disconnect", () => {

  });

  console.log(`connection: ${socket.id}!`);
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
io.listen(9000)
