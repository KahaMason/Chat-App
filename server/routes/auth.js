module.exports = function(app, fs) {
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