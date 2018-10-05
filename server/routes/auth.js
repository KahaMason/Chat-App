module.exports = function(app, db) {
    
    // Authenticate User Login Data
    app.post('/api/auth', (req, res) => {
        console.log("Recieved Post Request from Client");
        // Deconstruct Sent Data
        var uname = req.body.username;
        var pwd = req.body.password;
        
        // Select MongoDB Collection
        const collection = db.collection('users');
        
        // Authenticate Login Data with MongoDB
        collection.findOne({'username':uname, 'password':pwd}, function(err, user) {
            if (err) throw err;
            // Checks to See if an object is returned
            if (user != null) {
                // If Data Matches
                if (user.username == uname && user.password == pwd) {
                    // Return Success Response
                    console.log("Login Success");
                    res.send({'username':user.username, 'role':user.role, 'success':true});
                    return;
                }
            } else {
                // Return Failure Response
                console.log("Login Failure");
                var error = "No Match Found";
                res.send(error)
            }
        });
    });
}