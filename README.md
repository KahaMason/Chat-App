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
Menu – Used to present all the app routes and navigational links
Login – Used to present a login form for users to login to the chat system
Chat – Chat Application that communicates with users on the same socket

#### Routes:
Login – Used to navigate to the login form
Chat – Used to navigate to the chat rooms. Restricted Access: Users must be logged in

#### Modules:
Forms Module – Modules necessary for the handling of forms. E.g. login.
HttpModule – Module necessary for http server.

#### Services:
Socket Service – Used to establish socket client service to handle communication between server and clients. This includes send / receiving messages, channel list updates and channel creations.
addChannel – Handles socket updates that adds a new channel and updates it in the channel navigation of all users subscribed to getChannels() observable.
joinChannel – Handles request by users to join a new socket room to access new chat channel.
getChannels – An observable is created and returned that catches all updates received by the socket relating to the updating of Channels Navigation.
sendMessage – Transmits received messages to all other users connected to the socket.
getMessages – An observable is created that monitors all incoming messages from the socket and creates updates to the chatlogs.

#### Structure:

##### Menu
Router Links: Login & Chat – Menu component serves as a navigational bar for users to navigate between the different routes available in the app.

##### Login Component
Username & Password – Form input for username and password. No validation yet, simple store in session variables ‘username’

userLogin($event) – Upon submission of the form, store username value in session storage as variable “username”. After storing variable, navigate app to route ‘Chat’.

Session Storage: Username – Stored username as result of logging into the system. Used to identify users amongst chat logs. No user authentication implemented yet.

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

#### Structure:
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