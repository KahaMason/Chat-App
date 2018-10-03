module.exports = function(app, db) {
    // Respond to Admin POST Request for User Registration
    app.post('/api/admin/reg', (req, res) => {
        var uname = req.body.username.toString();
        const collection = db.collection('users');

        collection.findOne({'username':uname}, function(err, result) {
            if (err) throw err;
            else if (result != null) {
                if (result.username == uname) {
                    console.log("User Already Exists");
                    // Return False If User Exists
                    res.send({'username':uname, 'success':false});
                    return;
                }
            } else {
                var newuser = {username:uname, password:'', role:'Member'};
                collection.insertOne(newuser, function(err, result) {
                    if (err) throw err;
                    else if (result != null) {
                        console.log("Created New User");
                        res.send({'username':uname, 'success':true});
                        return;
                    }
                    res.send({'username':uname, 'success':false});
                });
            }
        });
    });
}