const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("userMessage", (message) => {
    io.emit("message", { id: socket.id, message: message });
  });
});

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html", { root: __dirname });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
