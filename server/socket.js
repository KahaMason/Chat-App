module.exports = function (app, io){
    // Respond to User connection via Socket.io.
    io.on('connection', (socket) => {
        console.log("User has connected");

        // Responds to User disconnecting from socket.
        socket.on('disconnect', function() {
            console.log("User has disconnected");
        });
    
        // Responds to receiving a message and emit to channel.
        socket.on('add-message', (channel, message) => {
            io.to(channel).emit("message", message);
        });

        // Join Default Channel on Login
        socket.on('default-channel', (username) => {
            var defaultchannel = "Default Welcome to Chat App";
            var message = (username + " has joined the channel");
            socket.join(defaultchannel, () => {
                socket.to(defaultchannel).emit("message", message);
            });
        });

        // Responds to requests to join new chatroom channel.
        socket.on('join-channel', (joinchannel, joinmessage) => {
            socket.join(joinchannel, () => {
                io.to(joinchannel).emit("message", joinmessage);
            });
        });
        
        // Disconnect from Previous Channel when Joining New Channel
        socket.on('leave-channel', (leavechannel, leavemessage) => {
            socket.leave(leavechannel, () => {
                io.to(leavechannel).emit("message", leavemessage);
            });
        });
    });
}