import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin: ['http://localhost:5173'],
  }
})

export const getReceiverSocketId = (userId) => {
  return userSockedMap[userId]
}

// used to store online users
const userSockedMap = {}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId
  
  if(userId) userSockedMap[userId] = socket.id  

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSockedMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSockedMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSockedMap));
  })
  
})

export {io, app, server};