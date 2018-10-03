module.exports = function(app, db) {
    // Fetch Group Data for Observables
    app.post('/api/admin/groups/fetchdata', async (req, res) => {
        const collection = db.collection('groups');
        let fields = { projection: {groupname:1, channels:1}};
        let groups = await collection.find({}, fields).toArray();
        res.send(groups);
    });
    
    // Respond to HTTP Request to create a new group
    app.post('/api/admin/groups/creategroup', (req, res) => {
        var groupname = req.body.groupname.toString();
        const collection = db.collection('groups');

        collection.findOne({'groupname':groupname}, function (err, result){
            if (err) throw err;
            else if (result != null) {
                if (result.groupname == groupname) {
                    console.log("Group: '" + groupname + " ' already exists");
                    res.send({'groupname':groupname, 'success':false});
                    return;
                }
            } else {
                collection.insertOne({'groupname':groupname, 'channels':[]}, function(err, result) {
                    if (err) throw err;
                    if (result != null) {
                        console.log("Created New Group");
                        res.send({'groupname':groupname, 'success':true});
                        return;
                    }
                });
            }
        });
    });

    // Respond to HTTP Request to create new Channel
    app.post('/api/admin/groups/createchannel', (req, res) => {
        var groupname = req.body.groupname.toString();
        var channelname = req.body.channelname.toString();
        const collection = db.collection('groups');
        var searchquery = {'groupname':groupname, 'channels':{channelname:channelname}};
        var insertchannel = { $push: {channels:{channelname:channelname}}};
        
        collection.findOne(searchquery, function(err, result) {
            if (err) throw err;
            else if (result != null) {
                console.log("Found an Existing Channel");
                res.send({'groupname':groupname, 'channelname':channelname, 'success':false});
                return;
            } else {
                collection.updateOne({groupname:groupname}, insertchannel, function(err, result) {
                    if (err) throw err;
                    else if (result != null) {
                        console.log("Created New Channel");
                        res.send({'groupname':groupname, 'channelname':channelname, 'success':true});
                        return;
                    }
                });
            }
        });
    });

    // Respond to HTTP Request to Delete Group
    app.post('/api/admin/groups/deletegroup', (req, res) => {
        var groupname = req.body.groupname.toString();
        const collection = db.collection('groups');

        collection.deleteOne({'groupname':groupname}, function(err, group) {
            if (err) throw err;
            else if (group != null) {
                console.log("Deleting Group: " + groupname);
                res.send({'groupname':groupname, 'success':true});
                return;
            }
            res.send({'groupname':groupname, 'success':false});
        });
    });

    // Respond to HTTP Request to Delete Channel
    app.post('/api/admin/groups/deletechannel', (req, res) => {
        var groupname = req.body.groupname.toString();
        var channelname = req.body.channelname.toString();
        const collection = db.collection('groups');
        var searchquery = {'groupname':groupname, 'channels':{channelname:channelname}};
        var deletechannel = { $pull: {channels:{channelname:channelname}}};

        collection.findOne(searchquery, function(err, result) {
            if (err) throw err;
            else if (result != null) {
                collection.updateOne({groupname:groupname}, deletechannel, function(err, result) {
                    if (err) throw err;
                    else if (result != null) {
                        console.log("Deleted Channel '" + channelname + "' from Group '" + groupname + "'");
                        res.send({'groupname':groupname, 'channelname':channelname, 'success':true});
                    }
                });
                return;
            } else {
                res.send({'groupname':groupname, 'channelname':channelname, 'success':false});
            }
        });
    });
}