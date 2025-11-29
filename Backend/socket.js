const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

// Function to initialize the socket.io server
function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // Allow all origins (adjust as needed for security)
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, userType, location } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { location });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { location });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

// Function to send a message to a specific socket ID
function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.error("Socket.io is not initialized.");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
