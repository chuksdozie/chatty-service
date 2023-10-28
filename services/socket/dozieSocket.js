const { Server: socket } = require("socket.io");
const http = require("http");
// const socketEvents = require("./socketEvents");

const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = new socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
    // transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    // console.log('new user connected', socket.id)
    // socket.data.username = "alice";
    socket.on("addUser", async (userId) => {
      //   socketEvents.addUser(userId, socket.id, socket, io);
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
