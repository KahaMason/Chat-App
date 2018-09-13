# Chat App

## 3818ICT - Software Frameworks

#### Kaha Mason (S2762038)

### How to run application
1. Open Terminal and navigate to the client folder.
2. Enter 'ng build' into the terminal to create the distributable version of the application.
3. Navigate terminal to server folder.
4. Enter 'npm start' to initialise server.
5. Open browser and enter 'http://localhost:3000' to access Chat App.

### Client
The client is detached from server functions and only handles client-side interactions and request made by the user to be forwarded to the server for processing. Client communicated with other users with socket connection with the package Socket.io/Client.

#### Packages:
➢ Socket.io/Client – Used to establish socket connection to server

#### Components:
➢ Menu – Used to present all the app routes and navigational links
➢ Login – Used to present a login form for users to login to the chat system
➢ Chat – Chat Application that communicates with users on the same socket

#### Routes:
➢ Login – Used to navigate to the login form
➢ Chat – Used to navigate to the chat rooms. Restricted Access: Users must be logged in

#### Modules:
➢ Forms Module – Modules necessary for the handling of forms. E.g. login.
➢ HttpModule – Module necessary for http server.
➢ HTTPClientModule - Used for POST form requests to server.

#### Services:
➢ Socket Service – Used to establish socket client service to handle socket and message communication between server and clients.
➢ Auth Service - Used to POST data to Server Routes for User Login Authentication.

#### Structure:
Admin
    Admin.html - HTML Interface for users that have the Super / Group admin privileges to administer the chat group / channels and users.
    Admin.ts - Holds functions that send HTTP POSTs to server that can create new user / channels / groups and also administer roles, channels and groups.
Chat
    Chat.html - HTML Interface for client to send and recieve messages over socket.
    Chat.ts - Holds functions that subscribe to the Socket service hosted on the server to send and recieve messages to / from other users.
Login
    Login.html - HTML Interface for client to input User Authentication Data to send to the server.
    Login.ts - Holds functions that gathers Authentication Input and HTTP POSTs data to server through Auth service for authentication.
Menu
    Menu.html - Navigational Listing that lists the app routes for users.
    Menu.ts - Used to execute User Checks and Logout Feature.

App.modules - Hosts all imported modules nessasary for app functionality.
    FormsModule - Handles NG Form structure and data.
    HTTPModule - Used for Client Side HTTP interaction with server.
    HTTPClientModule - Used to HTTP POST data from client to server.
    SocketService - Used to host Socket Service on client side.

##### Menu
Router Links: Login & Chat – Menu component serves as a navigational bar for users to navigate between the different routes available in the app.

##### Login
Username & Password – Form input for username and password. No validation yet, simple store in session variables ‘username’
userLogin() – HTTP Server Form POST function to send user authentication request via Auth Service. 
Session Storage: Username / Role - Stores user information returned by Authentication Process (Auth Service) into session variables for client.

##### Chat

###### Channel Navigation
Channel Navigation serves as a navigation side bar that users may use to create and join new chat channels. Channel Navigation serves as an outlet for observable getChannels()
addChannel() – retrieves input ‘channel’ from input ‘newchannel’ to be used to create a link to join a new chat channel. Stores links and sends update to navigationfeed through socket service addChannel() function.
joinChannel(chanel) – Upon clicking a link in channel navigation, users opt to join a new channel with the designation of the name selected. Channel change request is handled by the socket service joinChannel() function.

###### ChatBox
The chat box serves as interface for the sending and receiving of user messages. The Chatlog serves as an outlet for message communication over the socket service.
Logout Button – Simple logout button that calls logout() that wipes the session storage variables and redirects router back to login page.
Chatlog – Outlet for chat messages sent and received by all users connected to socket.
Chat Message – Chat Message input
Send Button – Calls the function sendMessage() that stores message in messages array and send the message and updates to all users subscribed to getMessages() observable.

### Server
Localhost:3000
The server host the application and handles all socket requests and functions made by the clients and distributes the information accordingly.

#### Packages:
➢ Socket.io – Used to establish connections between client
➢ Express – Used to host server for client connections

#### Routes:
➢ Auth - Auth Route Handles HTTP Forms sent from the clients to the server and authenticates user login data.
➢ Reg - Reg Route Handles HTTP Forms sent from admin tools and registers a new user into the database.

#### Structure:
server.js - Node Server.
listen.js - Module Import to Server.js - Hosts Server on localport:3000 and listens to client access.
socket.js - Module Import to Server.js - Hosts server Socket communications between server and clients.
routes
    auth.js - Route used by the server to recieve HTTP POSTs to the server for User Authentication. 
    register.js - Route used by the server to handle Admin Tools HTTP POSTs to server for registering a new user.
datastorage
    serverdata.JSON - Database - Stores the User, Channel and Group data for the server in JSON format.

#### Functions:
Io.on(‘connection’) – handles all socket functions and requests made by users connected to the server.
Socket.on(‘add-message’, message) – Communicates ‘message’ to all users connected to the socket.
Socket.on(‘add-channel’, channel) – Communicates the creation of a new chat channel to all users connected to the socket.
Socket.on(‘join-channel’, channel) – Handles requests by users to join selected channel for chat.

### Git Repository
Github: github.com/MrKSM/Chat-App

#### Branches:
##### Master
The master branch contains all the stable milestones achieved during app development. This branch serves as a reference point of each stable change and milestone committed during application development.

##### Project Development
This serves as a temporary development branch used to test new features and coding additions currently being developed for implementation into the application. This branch is merged and deleted upon development of stable code into the master branch. Used to test new features such as chat development and login functions.