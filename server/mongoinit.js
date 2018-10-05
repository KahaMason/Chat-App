module.exports = function(db) {
    // Initialise MongoDB with Starting Data
    console.log("Initialising MongoDB Data");
    var usercollection = db.collection("users");
    var groupscollection = db.collection("groups");

    // Check and Initialise Collections if Empty
    function collections(){
        // Check if User Collection Exists
        usercollection.find({}).toArray(function(err, result) {
            if (err) throw err;
            else if (result == null) {
                // Create Collection if No Collection Found
                console.log("MongoDB: Initialise Users Collection");
                db.createCollection("users");
            }
        });

        // Check if Group Collection Exists
        groupscollection.find({}).toArray(function(err, result) {
            if (err) throw err;
            else if (result == null) {
                // Create Collection if No Collection Found
                console.log("MongoDB: Initialise Groups Collection");
                db.createCollection("groups");
            }
        });
    }

    // Check if Default Documents already exist within Collections
    function documents() {
        // Check if User Mr KSM Exists
        usercollection.findOne({username:'Mr KSM'}, function(err, result) {
            if (err) throw err;
            else if (result == null) {
                // Insert Mr KSM in Users Collection if doesn't exist
                console.log("MongoDB: Initialise Mr KSM");
                usercollection.insertOne({username:"Mr KSM", password: "admin123", role:"Super Admin", profilepic:null});
            }
        });

        // Check if User Mr Bubbles Exists
        usercollection.findOne({username:"Mr Bubbles"}, function(err, result) {
            if (err) throw err;
            else if (result == null) {
                // Insert Mr Bubbles in Users Collection if doesn't exist
                console.log("MongoDB: Initialise Mr Bubbles");
                usercollection.insertOne({username:"Mr Bubbles", password:"bubbles123", role:"Member", profilepic:null});
            }
        });

        // Check if Admin Group Exists
        groupscollection.findOne({groupname:"Admin Group"}, function(err, result) {
            if (err) throw err;
            else if (result == null) {
                // Insert Admin Groun in Groups Collection if doesn't exist
                console.log("MongoDB: Initialise Admin Group");
                groupscollection.insertOne({groupname:"Admin Group", channels:[{channelname:"Admin Channel"}]});
            }
        });

        // Checks if Default Group Exists
        groupscollection.findOne({groupname: "Default"}, function(err, result) {
            if (err) throw err;
            else if (result == null) {
                // Insert Default Group in Groups Collection if doesn't exist
                console.log("MongoDB: Initialise Default Group");
                groupscollection.insertOne({groupname:"Default", channels:[{channelname:"Welcome to Chat App"}]});
            }
        });
    }

    // Run MongoDB Initialisation
    collections();
    documents();
}