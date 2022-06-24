const socket = io("ws://127.0.0.1:5000");

socket.on("uctwssclient", function (data) {
  console.log(data)
});
  