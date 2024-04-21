import { io } from "socket.io-client";

export const initializeSocket = () => {
  const socket = io("ws://localhost:8000", { reconnectionDelay: 1000 });
  socket.on("connect", () => {
    console.log("Socket connected: ", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected.");
  });

  return socket;
};
