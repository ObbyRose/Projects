module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("New user connected");
        socket.on("subscribe", (businessId) => {
        socket.join(businessId);
        console.log(`User subscribed to business ${businessId}`);
        });
        socket.on("notifySubscribers", (businessId, message) => {
            socket.to(businessId).emit("notification", message);
        });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    });
};