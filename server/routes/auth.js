module.exports = function(app, fs) {
    
    // Authenticate User Login Data
    app.post('/api/auth', (req, res) => {
        console.log("Recieved Post Request from Client");
        var uname = req.body.username;
        var datastorage;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function (err, data) {
            if (err) {
                // Data File Failed To Load.
                err = "Data File Failed to Load";
            } else {
                // Parse JSON file data into a Javascript Object
                datastorage = JSON.parse(data);

                // Cycle through JSON data file to find User Match.
                for (let i = 0; i < datastorage.users.length; i++) {
                    if (datastorage.users[i].name == uname) {
                        var authuser = datastorage.users[i];
                        // Return Success on User Match
                        res.send({'username': authuser.name, 'role':authuser.role, 'success':true});
                        return;
                    }
                }

                // Return if no Matching User found.
                err = "No User Match Found";
                res.send(err);
            }
        });
    });
    
    // REST API of User Authentication
    app.get('/api/auth', (req, res) => {
        var uname = req.query.username;
        var datastorage;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                res.send({'username':uname, 'success':false});
            } else {
                // Parse JSON file data into a Javascipt Object
                datastorage = JSON.parse(data);
               
                // Cycle through the length of the array to compare usernames with data storage
                for (let i = 0; i < datastorage.users.length; i++) {
                    if (datastorage.users[i].name == uname) {
                        // Return success on match
                        res.send({'username':uname, 'success': true});
                        return;
                    }
                }

                // If no usernname is found, return failure
                res.send({'username':uname, 'success':false});
            }
        });
    });
}