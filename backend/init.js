
const jwt = require("jsonwebtoken");
const store = require("./store");
const User = require("./models/User");

module.exports = () => {

  // userId -> Set(socketIds)
  store.onlineUsers = new Map();

  // =========================
  // AUTH MIDDLEWARE
  // =========================
  store.io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication error: token required"));
    }

    try {
      const payload = jwt.verify(token, store.config.secret);

      socket.user = payload;
      socket.userId = payload.id; // store directly for safety

      next();
    } catch (err) {
      return next(new Error("Authentication error: invalid token"));
    }
  });

  // =========================
  // CONNECTION
  // =========================
  store.io.on("connection", (socket) => {

    const userId = socket.userId;

    console.log("User connected:", socket.user.email, socket.id);

    // join personal room
    socket.join(userId);

    // if user not exist create new set
    if (!store.onlineUsers.has(userId)) {
      store.onlineUsers.set(userId, new Set());
    }

    // add socket id
    const userSockets = store.onlineUsers.get(userId);
    userSockets.add(socket.id);

    emitOnlineUsers();

    // =========================
    // EVENTS
    // =========================

    socket.on("typing", ({ room, userId, isTyping }) => {
      socket.to(room).emit("userTyping", { room, userId, isTyping });
    });

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    // =========================
    // DISCONNECT
    // =========================

    socket.on("disconnect", async () => {

      const userId = socket.userId;

      console.log("Socket disconnected:", socket.id);

      const sockets = store.onlineUsers.get(userId);

      if (!sockets) return;

      // remove this socket
      sockets.delete(socket.id);

      // if user has no sockets left → offline
      if (sockets.size === 0) {

        store.onlineUsers.delete(userId);

        try {

          await User.findByIdAndUpdate(userId, {
            lastOnline: new Date()
          });

          console.log("User fully offline:", userId);

        } catch (err) {
          console.error("Failed updating lastOnline:", err);
        }

      }

      emitOnlineUsers();
    });

  });

  // =========================
  // EMIT ONLINE USERS
  // =========================

  function emitOnlineUsers() {

    const formattedUsers = Array.from(store.onlineUsers.keys()).map((id) => ({
      id,
      status: "online"
    }));

    store.io.emit("onlineUsers", formattedUsers);

  }

};