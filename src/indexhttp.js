const express = require("express");
const socket = require("socket.io");
const http = require('http')

// App setup
const PORT = 5000;
const app = express();
const server = http.createServer({}, app).listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server, {
  cors: {
  origin: "*",
  methods: ["GET", "POST"]
  }
});


io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("uctwss", function (data) {
    io.emit("uctwssclient", data);
  });

  socket.on("new user", function (data) {
    io.emit("new user", [1]);
  });

  socket.on("disconnect", () => {
    io.emit("user disconnected", socket.userId);
  });

  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });
  
  socket.on("typing", function (data) {
    console.log(data)
    socket.broadcast.emit("typing", data);
    io.emit("chat message", data);
  });
});