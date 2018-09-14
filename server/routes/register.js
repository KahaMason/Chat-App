module.exports = function(app, fs) {
    // Respond to Admin POST Request for User Registration
    app.post('/api/admin/reg', (req, res) => {
        var datastorage;
        var uname = req.body.username;

        // Read JSON Database File
        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {
                console.log(err);
            } else {
                // Parse JSON file data to Javascipt Object
                datastorage = JSON.parse(data);

                // Search database to find if user already exists
                for (let i = 0; i < datastorage.users.length; i++) {
                    // Compare Database Usernames against recieved input
                    if (uname == datastorage.users[i].name) {
                        
                        // Send back response for found user to client
                        res.send({'username': uname, 'success':false});
                        return;
                    }
                }

                // Continue if No Matching Users in Database
                // Push new registered user into parsed database variable 
                datastorage.users.push({'name':uname, 'role':"User"});
                var newdata = JSON.stringify(datastorage);
                
                // Write to JSON File
                fs.writeFile('./datastorage/serverdata.json', newdata, 'utf-8', function(err){
                    if (err) throw err;
                    // Send back response for registering new user to client
                    else {res.send({'username': uname, 'success':true});}
                });
            }
        });
    });

    // REST API for Registration
    app.get('/api/admin/reg', (req, res) => {
        var datastorage;
        var uname = req.query.username;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {
                console.log(err);
            } else {
                // Parse JSON file data to Javascipt Object
                datastorage = JSON.parse(data);

                // Search database to find if user already exists
                for (let i = 0; i < datastorage.users.length; i++) {
                    // Compare Database Usernames against recieved input
                    if (uname == datastorage.users[i].name) {
                        
                        // Send back response for found user to client
                        res.send({'username': uname, 'success':false, 'status':"User already exists"});
                        return;
                    }
                }
                
                res.send({'username': uname, 'success':true, 'status':"User Created"});
            }
        });
    });
}