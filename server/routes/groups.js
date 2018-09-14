module.exports = function(app, fs) {
    // Fetch Group Data to populate Admin Tools
    app.post('/api/admin/groups/fetchdata', (req, res) => {
        var datastorage;
        var grouplist;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);
                grouplist = datastorage.groups;
                res.send(grouplist);
            }
        });
    });
    
    // Respond to HTTP Request to create a new group
    app.post('/api/admin/groups/creategroup', (req, res) => {
        var groupname = req.body.groupname;
        var datastorage;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);

                for (let i = 0; i < datastorage.groups.length; i++) {
                    if (groupname == datastorage.groups[i].groupname) {
                        res.send({'groupname':groupname, 'success':false});
                        return;
                    }
                }

                datastorage.groups.push({'groupname':groupname});
                var newdata = JSON.stringify(datastorage);

                fs.writeFile('./datastorage/serverdata.json', newdata, 'utf-8', function(err){
                    if (err) throw err;
                    else {res.send({'groupname':groupname, 'success':true});}
                });
            }
        });
    });

    // Respond to HTTP Request to create new Channel
    app.post('/api/admin/groups/createchannel', (req, res) => {
        var groupname = req.body.groupname;
        var channelname = req.body.channelname;
        var datastorage;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);
                
                for (let g = 0; g < datastorage.groups.length; g++) {
                    for (let c = 0; c < datastorage.groups[g].channels.length; c++) {
                        if (groupname == datastorage.groups[g].groupname && channelname == datastorage.groups[g].channels[c].channelname) {
                            res.send({'groupname':groupname, 'channelname':channelname, 'success':false});
                            return;
                        }
                    }
                }

                for (let i = 0; i < datastorage.groups.length; i++) {
                    if (groupname == datastorage.groups[i].groupname) {
                        datastorage.groups[i].channels.push({'channelname':channelname});
                        var newdata = JSON.stringify(datastorage);
                        fs.writeFile('./datastorage/serverdata.json', newdata, 'utf-8', function(err) {
                            if (err) throw err;
                            else {res.send({'groupname':groupname, 'channelname':channelname, 'success':true});}
                        });
                    }
                }
            }
        });
    });

    // Respond to HTTP Request to Delete Group
    app.post('/api/admin/groups/deletegroup', (req, res) => {
        var groupname = req.body.groupname;
        var datastorage;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);

                for (let i = 0; i < datastorage.groups.length; i++) {
                    if (groupname == datastorage.groups[i].groupname) {
                        datastorage.groups.splice(i, 1);
                        var newdata = JSON.stringify(datastorage);

                        fs.writeFile('./datastorage/serverdata.json', newdata, 'utf-8', function(err) {
                            if (err) throw err;
                            else {res.send({'groupname':groupname, 'success':true});}
                        });
                        return;
                    }
                }
                res.send({'groupname':groupname, 'success':false});
            }
        });
    });

    // REST API for Group Creation
    app.get('/api/admin/groups/creategroup', (req, res) => {
        var groupname = req.query.groupname;
        var datastorage;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);

                for (let i = 0; i < datastorage.groups.length; i++) {
                    if (groupname == datastorage.groups[i].groupname) {
                        res.send({'groupname':groupname, 'success':false, 'status':"Group already exists"});
                        return;
                    }
                }
                res.send({'groupname':groupname, 'success':true, 'status':"Group has been created"});
            }
        });
    });

    // REST API for Channel Creation
    app.get('/api/admin/groups/createchannel', (req, res) => {
        var groupname = req.query.groupname;
        var channelname = req.query.channelname;
        var datastorage;

        fs.readFile('./datastorage/serverdata.json', 'utf-8', function(err, data) {
            if (err) {console.log(err);}
            else {
                datastorage = JSON.parse(data);
                
                for (let g = 0; g < datastorage.groups.length; g++) {
                    for (let c = 0; c < datastorage.groups[g].channels.length; c++) {
                        if (groupname == datastorage.groups[g].groupname && channelname == datastorage.groups[g].channels[c].channelname) {
                            res.send({'groupname':groupname, 'channelname':channelname, 'success':false, 'status':"Channel already exist"});
                            return;
                        }
                    }
                }
                res.send({'groupname':groupname, 'channelname':channelname, 'success':true, 'status':"Channel has Been created"});
            }
        });
    });
}