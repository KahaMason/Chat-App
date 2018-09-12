module.exports = function(server) {
    // Initialise Server on port 3000.
    const port = process.env.PORT || 3000;
    
    // Respond to Server Initialisation.
    server.listen(port, () => {
        console.log("Server Initialised");
        console.log("Listening on port: " + port);
    });
}