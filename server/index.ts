const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
import router from "./api";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";

const { addUser, getUser, deleteUser, getUsers } = require("./users");

const server = createServer(app);
const port = process.env.PORT || 8000;

const gameState = {
  state: "waiting",
  players: [],
};

const io = new Server(server, {
  // options
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  // ...

  socket.on("player join", ({ name, room }) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error) return;
    console.log(`User ${user.name} joined room ${user.room}. Socket ID: ${socket.id}`);
    socket.join(user.room);
    io.sockets
      .emit("notification", {
        title: "Someone's here",
        description: `${user.name} just entered the room`,
      });

    io.sockets.emit("users", getUsers(room));
    //io.emit('gameState', gameState);
  });

  socket.on("game start", () => {
    gameState.state = "playing";
    console.log('lets start playing')
    io.sockets.emit('startGameState', 'playing');
  });

  socket.on("judging", () => {
    gameState.state = "judging";
    io.sockets.emit('endGameState', 'judging');
  });

  socket.on("disconnect", () => {
    gameState.players = gameState.players.filter(
      (player) => player.id !== socket.id
    );
    // io.emit("gameState", gameState);
  });

  console.log(`connection: ${socket.id}!`);
});

dotenv.config();

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Connected to MongoDB database");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(bodyParser.raw({ type: '*/*',  limit: '50mb' }));
app.use("/", router);

// app.use('/game/:id/submit', express.raw({ type: '*/*' }));


server.listen(port, () => {
  console.log("Server started on port 8000!");
});
io.listen(9000);
