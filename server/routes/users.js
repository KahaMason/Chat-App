module.exports = function(app, db) {
    // Fetch Users List
    app.post('/api/admin/users/fetchdata', async (req, res) => {
        // Select MongoDB Collection and Create Queries
        const collection = db.collection('users');
        let fields = { projection: {username:1, role:1, profilepic:1}};
        
        // Query MongoDB to Retrieve and Return List of All Users with Limited Fields
        let users = await collection.find({}, fields).toArray();
        res.send(users);
    });
    
    // Respond to HTTP Request to Update User Roles
    app.post('/api/admin/users/updaterole', (req, res) => {
        // Deconstruct Sent Data
        var uname = req.body.username.toString();
        var newrole = req.body.role.toString();
        
        // Select MongoDB Collection and Create Update Query
        const collection = db.collection('users');
        var updaterole =  { $set: {role:newrole} };
        
        // Update User Role on MongoDB
        collection.updateOne({username:uname}, updaterole, function(err, result) {
            if (err) throw err;
            else if (result != null) {
                // Return Success Response
                console.log("Updated User Role");
                res.send({'username':uname, 'role':newrole, 'success':true});
                return;
            }
            // Return Failure Response
            res.send({'username':uname, 'success':false});
        });
    });

    // Respond to HTTP Request to Delete User
    app.post('/api/admin/users/deleteuser', (req, res) => {
        // Deconstruct Sent Data
        var uname = req.body.username.toString();
        
        // Select MongoDB Collection and Create Query
        const collection = db.collection('users');
        var query = {username: uname};

        // Query MongoDB to Delete Selected User
        collection.deleteOne(query, function(err, result) {
            if (err) throw err
            else if (result != null) {
                // Return Success Response
                console.log(uname + ' has been deleted');
                res.send({'username':uname, 'success':true});
                return;
            } else {
                // Catches Error if MongoDB didn't return a match
                console.log("Error: Query didn't return matching User");
                res.send({'username':uname, 'success':false});
            }
        });
    });
}