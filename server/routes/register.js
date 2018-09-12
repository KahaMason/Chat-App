module.exports = function(app, fs) {
    app.get('/api/reg', (req, res) => {
        var userExists = 0;
        var datastorage;

        var uname = req.query.username;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {
                console.log(err);
            } else {
                datastorage = JSON.parse(data);
                for (let i=0; i < datastorage.users.legnth; i++) {
                    if (datastorage.users[i].name == uname) {
                        userExists = 1;
                    }
                }
            }

            if (userExists > 0) {
                res.send({'username':'', 'success':false});
            } else {
                datastorage.users.push({'name':uname});

                var newdata = JSON.stringify(datastorage);
                fs.writeFile('./datastorage/serverdata.json', newdata, 'utf-8', function(err) {
                    res.send ({'username': uname, 'success':true});
                });
            }
        });
    });
}