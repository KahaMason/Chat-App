module.exports = function(app, db) {
    // Fetch Group Data
    app.post('/api/admin/groups/fetchdata', async (req, res) => {
        // Select MongoDB Collection and Create Query
        const collection = db.collection('groups');
        let fields = { projection: {groupname:1, channels:1}};
        
        // Query MongoDB and Return List of Groups and Channels
        let groups = await collection.find({}, fields).toArray();
        res.send(groups);
    });
    
    // Respond to HTTP Request to create a new group
    app.post('/api/admin/groups/creategroup', (req, res) => {
        // Deconstruct Send Data
        var groupname = req.body.groupname.toString();
        
        // Select MongoDB Collection
        const collection = db.collection('groups');

        // Query MongoDB to Find If Matching Group Already Exists
        collection.findOne({'groupname':groupname}, function (err, result){
            if (err) throw err;
            // If Match Is Found
            else if (result != null) {
                // Check If Returned Groupname matches
                if (result.groupname == groupname) {
                    // Return Failure Response
                    console.log("Group: '" + groupname + " ' already exists");
                    res.send({'groupname':groupname, 'success':false});
                    return;
                }
            } else {
                // Query MongoDB To Insert New Group
                collection.insertOne({'groupname':groupname, 'channels':[]}, function(err, result) {
                    if (err) throw err;
                    if (result != null) {
                        // Return Success Response
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
        // Deconstruct Sent Data
        var groupname = req.body.groupname.toString();
        var channelname = req.body.channelname.toString();
        
        // Select MongoDB Collection and Create Queries
        const collection = db.collection('groups');
        var searchquery = {'groupname':groupname, 'channels':{channelname:channelname}};
        var insertchannel = { $push: {channels:{channelname:channelname}}};
        
        // Query MongoDB to Find if the Channel already exists in Group
        collection.findOne(searchquery, function(err, result) {
            if (err) throw err;
            // If Match Is Found
            else if (result != null) {
                // Return Failure Response
                console.log("Found an Existing Channel");
                res.send({'groupname':groupname, 'channelname':channelname, 'success':false});
                return;
            } else {
                // Update and Insert New Channel if no match is found
                collection.updateOne({groupname:groupname}, insertchannel, function(err, result) {
                    if (err) throw err;
                    else if (result != null) {
                        // Return Success Response
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
        // Deconstruct Sent Data
        var groupname = req.body.groupname.toString();
        
        // Select MongoDB Collection
        const collection = db.collection('groups');

        // Query MongoDB to Delete Group from Collection
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
        // Deconstruct Sent Data
        var groupname = req.body.groupname.toString();
        var channelname = req.body.channelname.toString();
        
        // Select MongoDB and Create Queries
        const collection = db.collection('groups');
        var searchquery = {'groupname':groupname, 'channels':{channelname:channelname}};
        var deletechannel = { $pull: {channels:{channelname:channelname}}};

        // Query MongoDB to Find if Channel Exists in Group
        collection.findOne(searchquery, function(err, result) {
            if (err) throw err;
            // If Match Is Found
            else if (result != null) {
                // Delete Channel From Group
                collection.updateOne({groupname:groupname}, deletechannel, function(err, result) {
                    if (err) throw err;
                    else if (result != null) {
                        // Return Success Response
                        console.log("Deleted Channel '" + channelname + "' from Group '" + groupname + "'");
                        res.send({'groupname':groupname, 'channelname':channelname, 'success':true});
                    }
                });
                return;
            } else {
                // Return Failure Response
                res.send({'groupname':groupname, 'channelname':channelname, 'success':false});
            }
        });
    });
}