module.exports = function(db) {
    // Initialise MongoDB with Starting Data
    console.log("Initialising MongoDB Data");
    var usercollection = db.collection("users");
    var groupscollection = db.collection("groups");

    // Check and Initialise Collections if Empty
    function collections(){
        usercollection.find({}).toArray(function(err, result) {
            if (err) throw err;
            else if (result == null) {
                console.log("MongoDB: Initialise Users Collection");
                db.createCollection("users");
            }
        });

        groupscollection.find({}).toArray(function(err, result) {
            if (err) throw err;
            else if (result == null) {
                db.createCollection("groups");
            }
        });
    }

    // Check and Insert Users if Missing
    function documents() {
        usercollection.findOne({username:'Mr KSM'}, function(err, result) {
            if (err) throw err;
            else if (result == null) {
                console.log("MongoDB: Initialise Mr KSM");
                usercollection.insertOne({username:"Mr KSM", password: "admin123", role:"Super Admin", status:"Offline"});
            }
        });

        usercollection.findOne({username:"Mr Bubbles"}, function(err, result) {
            if (err) throw err;
            else if (result == null) {
                console.log("MongoDB: Initialise Mr Bubbles");
                usercollection.insertOne({username:"Mr Bubbles", password:"bubbles123", role:"Member", status:"Offline"});
            }
        });

        groupscollection.findOne({groupname:"Admin Group"}, function(err, result) {
            if (err) throw err;
            else if (result == null) {
                console.log("MongoDB: Initialise Admin Group");
                groupscollection.insertOne({groupname:"Admin Group", channels:[{channelname:"Admin Channel"}]});
            }
        });

        groupscollection.findOne({groupname: "Default"}, function(err, result) {
            if (err) throw err;
            else if (result == null) {
                console.log("MongoDB: Initialise Default Group");
                groupscollection.insertOne({groupname:"Default", channels:[{channelname:"Welcome to Chat App"}]});
            }
        });
    }

    collections();
    documents();
}