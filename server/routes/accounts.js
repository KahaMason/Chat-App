module.exports = function(app, db, formidable) {
    // Respond to HTTP Requests to Update Account Password
    app.post('/api/accounts/users/updatepassword', (req, res) => {
        // Deconstruct Sent Data
        let username = req.body.username.toString();
        let password = req.body.password.toString();
        let newpassword = req.body.newpassword.toString();
        
        // Select MongoDB Collection and Update Password Query
        let updatepassword = { $set: {password:newpassword}};
        const collection = db.collection('users');

        // Authenticate Sent User Details
        collection.findOne({username:username, password:password}, function(err, result) {
            if (err) throw err;
            // Respond if Details Match in Database
            else if (result != null) {
                // Update Account Password
                collection.updateOne({username:username, password:password}, updatepassword, function(err, result) {
                    if (err) throw err;
                    else {
                        // Return Success Response
                        console.log("Updated an Account Password");
                        res.send({'success':true});
                        return;
                    }
                });
            } else {
                // Return Failure Response
                res.send({'success':false});
            }
        });
    });

    // Respond to HTTP Request to Retrieve Account Details
    app.post('/api/accounts/users/getdetails', async (req, res) => {
        // Deconstruct Sent Data
        let username = req.body.username.toString();
        
        // Select MongoDB Collection and Limit Fields returned
        let fields = { projection: {username:1, role:1, profilepic:1}};
        const collection = db.collection('users');

        // Query MongoDB and Return Result
        let userdetails = await collection.findOne({username:username}, fields);
        res.send(userdetails);
    });

    // Respond to HTTP Request to Upload an Image to Server
    app.post('/api/accounts/users/imgupload', (req, res) => {
        var form = new formidable.IncomingForm({uploadDir: './userimages'});
        form.keepExtensions = true;

        form.on('error', (err) => {
            throw err;
            res.send({
                result:'failed',
                data:{},
                numberOfImages:0,
                message:"Cannot upload images. Error: " + err
            });
        });

        form.on ('fileBegin', (name, file) => {
            file.path = form.uploadDir + "/" + file.name;
        });

        form.on('file', (field, file) => {
            res.send({
                result:'OK',
                data:{'filename':file.name, 'size':file.size},
                numberOfImages:1,
                message:"Upload is Successful"
            });
        });

        form.parse(req);
    });

    // Respond to HTTP Request to Update Account Profile Picture on MongoDB
    app.post('/api/accounts/users/updateprofilepic', async (req, res) => {
        // Deconstruct Sent Data
        let username = req.body.username.toString();
        let profilepic = req.body.profilepic.toString();

        // Select MongoDB Collection
        const collection = db.collection('users');

        // Query MongoDB to Update User Account Profile Picture and Return Updated Picture
        await collection.updateOne({username:username}, { $set: {profilepic:profilepic}});
        let pictureupdate = await collection.findOne({username:username}, { projection: {profilepic:1}});
        res.send(pictureupdate);
    });
}