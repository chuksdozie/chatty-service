// const { Server: socket } = require("socket.io");
const socketIO = require("socket.io");
const http = require("http");
// const socketEvents = require("./socketEvents");

const socketConnect = (app, server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    console.log("new user connected", socket.id);
    // socket.data.username = "alice";
    socket.join("room1");
    socket.on("addUser", async (userId) => {
      //   socketEvents.addUser(userId, socket.id, socket, io);
    });
    socket.on("hello", async (data) => {
      //   socketEvents.addUser(userId, socket.id, socket, io);
      console.log({ data, id: socket.id });
      // socket.broadcast.emit("1234", { userId, socketId: socket.id });
      // io.to("room1").emit("helloppp", { userId: "amadi" });
      io.emit("1234", { userId: data?.myId, info: data?.text });
      // socket.emit("1234", { userId: "amadi" });
    });
    socket.on("disconnect", async () => {
      console.log("a user disconnected!");
      //   socketEvents.removeUser(socket.id, socket, io);
    });
  });

  console.log({ OPEN_CLIENTS: io.engine.clientsCount });
  app.set("IO", io);
  return server;
};
//  const IO = req.app.get('IO');

module.exports = socketConnect;
