const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const path = require('path');
const socketIO = require('socket.io');
const io = socketIO(server);
const bodyParser = require('body-Parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Redirect Users to Client Distributable.
app.use(express.static(path.join(__dirname, '../client/dist/Chat-App')));

// Establish MongoDB Connection
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(err, client) {
    if (err) {return console.log(err);}
    console.log("Established MongoDB Connection");
    const dbName = 'chat-app';
    const db = client.db(dbName);

    // Mongo Database Initialisation
    // require('./mongodbinit.js')(db);

    // Import Server Files and Routes
    require('./listen.js')(server);
    require('./socket.js')(app, io, db);
    require('./mongoinit.js')(db);
    require('./routes/auth.js')(app, db);
    require('./routes/register.js')(app, db);
    require('./routes/users.js')(app, db);
    require('./routes/groups.js')(app, db);
});