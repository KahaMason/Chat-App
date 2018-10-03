module.exports = function(app, db) {
    
    // Authenticate User Login Data
    app.post('/api/auth', (req, res) => {
        console.log("Recieved Post Request from Client");
        var uname = req.body.username;
        var pwd = req.body.password;
        const collection = db.collection('users');
        
        collection.findOne({'username':uname, 'password':pwd}, function(err, user) {
            if (err) throw err;
            // Checks to See if an object is returned
            if (user != null) {
                if (user.username == uname && user.password == pwd) {
                    console.log("Login Success");
                    res.send({'username':user.username, 'role':user.role, 'success':true});
                    return;
                }
            } else {
                console.log("Login Failure");
                var error = "No Match Found";
                res.send(error)
            }
        });
    });
}