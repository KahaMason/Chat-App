module.exports = function(app, db) {
    // Respond to Admin POST Request for User Registration
    app.post('/api/admin/reg', (req, res) => {
        // Deconstruct Sent Data
        var uname = req.body.username.toString();
        
        // Select MongoDB Collection
        const collection = db.collection('users');

        // Query MongoDB to Find If User Exists
        collection.findOne({'username':uname}, function(err, result) {
            if (err) throw err;
            // If Match Is Found
            else if (result != null) {
                // If Match has same Username
                if (result.username == uname) {
                    // Return Failure Response
                    console.log("User Already Exists");s
                    res.send({'username':uname, 'success':false});
                    return;
                }
            } else {
                // Create New User
                var newuser = {username:uname, password:'newuser', role:'Member', profilepic: null};
                
                // Insert New User into MongoDB
                collection.insertOne(newuser, function(err, result) {
                    if (err) throw err;
                    // If Successfully Added
                    else if (result != null) {
                        // Return Success Response
                        console.log("Created New User");
                        res.send({'username':uname, 'success':true});
                        return;
                    }
                    // Return Failure Response
                    res.send({'username':uname, 'success':false});
                });
            }
        });
    });
}