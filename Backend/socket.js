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
      const { userId, location } = data;

      if (!location || typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
        return socket.emit('error', { message: 'Invalid location data' });
      }
      if (location.ltd === 0 && location.lng === 0) {
        return; // ignore default coords
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: 'Point',
          coordinates: [location.lng, location.ltd],
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

// Function to send a message to a specific socket ID
function sendMessageToSocketId(socketId, messageObject) {
  console.log(messageObject)
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io is not initialized.");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
