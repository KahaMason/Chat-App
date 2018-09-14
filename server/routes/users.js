module.exports = function(app, fs) {
    // Fetch Users List to populate Admin Tools
    app.post('/api/admin/users/fetchdata', (req, res) => {
        var datastorage;
        var userlist;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) throw err;
            else {
                datastorage = JSON.parse(data);
                userlist = datastorage.users;
                res.send(userlist);
            }
        });
    });
    
    // Respond to HTTP Request to Update User Roles
    app.post('/api/admin/users/updaterole', (req, res) => {
        var datastorage;
        var uname = req.body.username;
        var newrole = req.body.role;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);

                for (let i = 0; i < datastorage.users.length; i++) {
                    if (uname == datastorage.users[i].name) {
                        datastorage.users[i].role = newrole;
                        var newdata = JSON.stringify(datastorage);
                        
                        fs.writeFile('./datastorage/serverdata.json', newdata, 'utf-8', function(err) {
                            if (err) throw err;
                            else {res.send({'username':uname, 'role':newrole, 'success':true});}
                        });
                        return;
                    }
                }
                res.send({'username':uname, 'success':false});
            }
        });
    });

    // Respond to HTTP Request to Delete User
    app.post('/api/admin/users/deleteuser', (req, res) => {
        var datastorage;
        var uname = req.body.username;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);

                for (let i = 0; i < datastorage.users.length; i++) {
                    if (uname == datastorage.users[i].name) {
                        datastorage.users.splice(i, 1);
                        var newdata = JSON.stringify(datastorage);

                        fs.writeFile('./datastorage/serverdata.json', newdata, 'utf-8', function(err) {
                            if (err) throw err;
                            else {res.send({'username':uname, 'success':true});}
                        });
                        return;
                    }
                }
                res.send({'username':uname, 'success':false});
            }
        });
    });

    // REST API for Updating User Roles
    app.get('/api/admin/users/updaterole', (req, res) => {
        var datastorage;
        var uname = req.query.username;
        var newrole = req.query.role;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);

                for (let i = 0; i < datastorage.users.length; i++) {
                    if (uname == datastorage.users[i].name) {
                        res.send({'username':uname, 'role':newrole, 'success':true, 'status':"Role has been updated"});
                        return;
                    }
                }

                res.send({'username':uname, 'success':false, 'status':"User doesn't exist"});
            }
        });
    });
}