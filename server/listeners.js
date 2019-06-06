module.exports = io => {
  io.on("connection", socket => {
    console.log(`socket ${socket.id} connected`)
    socket.on("addNearby", newEntry => {
      socket.broadcast.emit("updateNearby", newEntry);
    });
  });
};
