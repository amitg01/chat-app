import express from "express";
import { Server } from "socket.io";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const ADMIN = "Admin";

const expressServer = app.listen(3500, () => {
  console.log("listening on port 3500");
});

const UsersState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://127.0.0.1:5500", "http://localhost:5500"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.emit("message", "Welcome to chat app");

  socket.broadcast.emit(
    "message",
    `User ${socket.id.substring(0, 5)} conected`
  );

  socket.on("message", (data) => {
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "message",
      `User ${socket.id.substring(0, 5)} disconected`
    );
  });

  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });
});
