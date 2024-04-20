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

const gameState = {
  state: 'waiting',
  players: [],
};

const io = new Server(server, {
  // options
});

io.on("connection", (socket) => {
  // ...

  gameState.players.push(socket);
  socket.emit("gameState", gameState);

  socket.on('player join', ( { name, room }, callback) => {
    gameState.players.push({ id: socket.id, name, room });
    socket.join(room);
    io.emit('gameState', gameState);
    callback();
  });


  socket.on('game start', () => {
    gameState.state = 'playing';
    io.emit('gameState', gameState);
  });

  socket.on('judging', () => {
    gameState.state = 'judging';
    io.emit('gameState', gameState);
  });

  socket.on("disconnect", () => {
    gameState.players = gameState.players.filter((player) => player.id !== socket.id);
    io.emit("gameState", gameState);
  });

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
