module.exports = function(app, db) {
    // Fetch Users List to populate Admin Tools
    app.post('/api/admin/users/fetchdata', async (req, res) => {
        const collection = db.collection('users');
        let fields = { projection: {username:1, role:1, status:1}};
        let users = await collection.find({}, fields).toArray();
        res.send(users);
    });
    
    // Respond to HTTP Request to Update User Roles
    app.post('/api/admin/users/updaterole', (req, res) => {
        var uname = req.body.username.toString();
        var newrole = req.body.role.toString();
        const collection = db.collection('users');
        var updaterole =  { $set: {role:newrole} };
        
        collection.updateOne({username:uname}, updaterole, function(err, result) {
            if (err) throw err;
            else if (result != null) {
                console.log("Updated User Role");
                res.send({'username':uname, 'role':newrole, 'success':true});
                return;
            }
            res.send({'username':uname, 'success':false});
        });
    });

    // Respond to HTTP Request to Delete User
    app.post('/api/admin/users/deleteuser', (req, res) => {
        var uname = req.body.username.toString();
        const collection = db.collection('users');
        var query = {username: uname};

        console.log("Attempting to Delete User");

        collection.deleteOne(query, function(err, result) {
            if (err) throw err
            else if (result != null) {
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