const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const path = require('path');
const socketIO = require('socket.io');
const io = socketIO(server);
const bodyParser = require('body-Parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Redirect Users to Client Distributable.
app.use(express.static(path.join(__dirname, '../client/dist/Chat-App')));

// Form Functions

// Import Server Function Files
require('./listen.js')(server);
require('./socket.js')(app, io);

// Server Routes
require('./routes/auth.js')(app, fs);
require('./routes/register')(app, fs);
require('./routes/users')(app, fs);
require('./routes/groups')(app, fs);