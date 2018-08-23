let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let path = require('path');

let socketIO = require('socket.io');
let io = socketIO(server);

// Initialise Server on port 3000
const port = process.env.PORT || 3000;

// Redirect Users to Client Distributable
app.use(express.static(path.join(__dirname, '../client/dist/Chat-App')));

// Respond to Server Initialisation
server.listen(port, () => {
    console.log("Server Initialised");
    console.log("Listening on port: " + port);
});

// Respond to User connection via Socket.io
io.on('connection', (socket) => {
    console.log("User has connected");
});