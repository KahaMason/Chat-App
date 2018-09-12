module.exports = function (app, io){
    // Respond to User connection via Socket.io.
    io.on('connection', (socket) => {
        console.log("User has connected");

        // Responds to User disconnecting from socket.
        socket.on('disconnect', function() {
            console.log("User has disconnected");
        });
    
        // Responds to receiving a message.
        socket.on('add-message', (message) => {
            io.emit('message', message);
        });

        // Responds to creation of new chatroom channels.
        socket.on('add-channel', (channel) => {
            io.emit('channel', channel);
            console.log("Channel Added: " + channel);
        });

        // Responds to requests to join new chatroom channel.
        socket.on('join-channel', (channel) => {
            console.log("joining channel: " + channel);
        });
    });
}