# Chat App

## 3818ICT - Software Frameworks

#### Kaha Mason (S2762038)
#### App Default Logins:
##### Admin User: 
* Username: Mr KSM
* Password: admin123
* Role: Super Admin

#### Member User:
* Username: Mr Bubbles
* Password: bubbles123
* Role: Member

#### Newly Created Users
* All Newly Created Users will be given a default password of 'newuser'

#### Host: localhost:3000

### How to run application
1. Open Terminal and navigate to the client folder.
2. Type 'npm install' to install client modules.
3. Navigate terminal to server folder.
4. Type 'npm install' to install server modules.
5. Stay in Server Folder with Terminal and execute the Following:
    * Execute These Only Once
        1. Type 'npm run prestartup' to create MongoDB and UserImages directories.
    * Execute These on Startup if not already started:
        1. Type 'npm run mongodb' to intialise MongoDB.
        2. Type 'npm run app' to build and run app and host server.
5. Open browser and enter 'http://localhost:3000' to access Chat App.
    * If 'npm run app' has already been used to build app, simply using 'npm start' will start the server without rebuilding the app.

### Client
The client is detached from server functions and only handles client-side interactions and request made by the user to be forwarded to the server for processing. Client handles sends socket communications to communicate and navigate through the chat app, sends update requests to Mongo Database System on server to update account data, retrieve lists of Groups and Channels and handle user interactions with others and the server.

#### Packages:
* Socket.io/Client – Used to establish socket connection to server

#### Components:
* Menu – Used to present all the app routes and navigational links
* Login – Used to present a login form for users to login to the chat system
* Chat – Chat Application that is user to communicate to others connect to the server
* Accounts - Page used to update account passwords and upload and change profile pictures

#### Routes:
* Login – Used to navigate to the login form
* Chat – Used to navigate to the chat rooms. Restricted Access: Users must be logged in.
* Accounts - Used to navigate to account details page to update password or profile picture

#### Modules:
* Forms Module – Modules necessary for the handling of forms. E.g. login.
* HttpModule – Module necessary for http server.
* HTTPClientModule - Used for POST form requests to server.

#### Services:
* Socket Service – Used to establish socket client service to handle socket and message communication between server and clients.
* Auth Service - Used to POST data to Server Routes for User Login Authentication.
* Admin Service - Used to POST data to Server Admin Routes to execute Admin Operations on the server.
* Account Service - Used to Handle POST to Server to Retrieve and Update Account information stored on Mongo Database. Also Handles Profile Image Uploads.

#### Structure:
1. Menu
    * Menu.html - Navigational Listing that lists the app routes for users.
    * Menu.ts - Used to execute User Checks and Logout Feature.
2. Login
    * Login.html - HTML Interface for client to input User Authentication Data to send to the server.
    * Login.ts - Holds functions that gathers Authentication Input and HTTP POSTs data to server through Auth service for authentication.
3. Chat
    * Chat.html - HTML Interface for client to send and recieve messages over socket. Also has access to Admin Tools reserved for admins.
    * Chat.ts
        1. Holds functions that subscribe to the Socket service hosted on the server to send and recieve messages to / from other users and join different channels.
        2. Holds functions that subscribe to retrieve feed of Users, Groups and Channel Listings
        3. Holds functions that can access Admin Management Tools. Restricted to Admin Users.
4. App.modules - Hosts all imported modules nessasary for app functionality.
    * FormsModule - Handles NG Form structure and data.
    * HTTPModule - Used for Client Side HTTP interaction with server.
    * HTTPClientModule - Used to HTTP POST data from client to server.
    * SocketService - Used to host Socket Service on client side.

##### Menu
* Router Links: Login | Chat | Accounts – Menu component serves as a navigational bar for users to navigate between the different routes available in the app.
* Logout Button – Simple logout button that calls logout() that wipes the session storage variables and redirects router back to login page.

##### Login
* Username & Password – Form input for username and password. No validation yet, simple store in session variables ‘username’
* userLogin() – HTTP Server Form POST function to send user authentication request via Auth Service. 
* Session Storage: Username / Role - Stores user information returned by Authentication Process (Auth Service) into session variables for client.

##### Chat

###### Chat Admin Tools
* Admin Tools are presented in the Chat Component, Admin Tools are only visable to Users with either the Group Admin or Super Admin roles.
    * Note: Admin Tools accesses the Group and Channels / User List Feeds to populate tools and update Mongo Database in real-time.

###### Chat Admin Functions:
* Create / Invite User - Super / Group admins can invite users or create a new user.
* Delete User - Only Super Users can delete users.
* Update Administrator - Super / Group admins can update the role of any user.
* Group Creation - Super / Group admins can create new groups.
* Create Channel - Super / Group admins can create new channels within groups.
* Delete Group - Super / Group admins can delete existing groups.
* Delete Channel - Super / Group admins can delete channels in existing groups.

###### Feeds
* Feeds are used to retrieve and display real-time data stored on the server Mongo Database. These feeds are used for different purposes and include:
    1. Account Details Feed - The account details feed is used to retrieve the user role and profile picture associated with the logged in user.
    2. Groups and Channels Feed - The groups and channels feed is displayed under 'Groups:' and is used to retrieve and display a list of groups and their channels stored in the MongoDB.
    3. User List Feed - The user list feed is displayed under 'Users' and is used to retrieve and display list of all users stored in the Mongo Database.

###### Account Details
* Username - Username is displayed in the Account Details Secition
* Role - The role of the logged in user is display in the Account Details Section
* Profile Picture - The user's profile is also displayed along side other user information

###### Channel Navigation
* Join Channel - Users can click on a channel in a group to join the channel. Current Channel User is connected to is displayed above Chat Window. A Message is emitted to all users in the channel being joined that a new user has joined the channel. Joining a new Channel will clear the chat messages in preperation for new channel messages.
* Leave Channel - When Users join a new channel, they automatically leave and disconnect from their previous channel. This actions responds by emitting a broadcast to all users in the previous channel that a user has left this channel.

###### Users List
* Users List - Chat Page displays a list of all the users stored in the Server's database in real-time, this feature is used to moniter how many users exist within the Chat-App and the roles that they are assigned.

###### ChatBox
The chat box serves as interface for the sending and receiving of user messages. The Chatlog serves as an outlet for message communication over the socket service.
* Current Group and Channel - The current group and channel a user is connected to is displayed above the Chat Window. This updates as users navigate through different groups and channels.
* Chatlog – Outlet for chat messages sent and received by all users connected to socket.
* Chat Message – Chat Message input
* Send Button – Calls the function sendMessage() that stores message in messages array and send the message and updates to all users subscribed to getMessages() observable.

##### Accounts

###### Account Details
* The current Account Details including the username and profile picture are displayed at the top of the page. This is to track the real-time updates to the account stored on the database.
* Username - Logged in User's Username
* Profile Picture - Users current profile picture stored on the database.

###### Password Update
* Password Update is used to update a users password on the database. Is usually useful for newly invited users to change their default passwords or for existig users to update theirs.
* Current Password - Input used to check if the user updating the account password is authenticate.
* New Password - Input used to replace old password in the database.
* Confirm New Password - Input used to verify if user has input the correct new password.

###### Profile Picture (Upload)
* Profile Picture (Upload) is designed for users to select a new profile picture to upload to server database.
* Selected File - Used to store the selected Profile Image for uploading

### Server
* Localhost:3000
The server host the application and handles all socket requests and functions made by the clients and distributes the information accordingly.

#### Packages:
* Socket.io – Used to establish connections between client
* Express – Used to host server for client connections
* MongoDB - Used as a Database Storage System to store Users, Groups and Channels on the server.
* Formidable - Used to create form data used for uploading profile images to be stored on the server.

#### Routes:
* Auth - Auth Route Handles HTTP Forms sent from the clients to the server and authenticates user login data.
* Register - Reg Route Handles HTTP Forms sent from admin tools and registers a new user into the database.
* Users - Admin HTTP Route used by admin tools for admins to create / invite new users, update user roles and permissions and delete users.
* Groups - Admin HTTP Route used by admins tools for admins to create new groups, create new channels and delete groups or channels.
* Accounts - HTTP Route used to handle requests to update a User's account information and profile picture stored on the server's database.

#### Structure:
1. server.js - Node Server.
2. listen.js - Module Import to Server.js - Hosts Server on localport:3000 and listens to client access.
3. socket.js - Module Import to Server.js - Hosts server Socket communications between server and clients.
4. routes
    * auth.js - Route used by the server to recieve HTTP POSTs to the server for User Authentication. 
    * register.js - Route used by the server to handle Admin Tools HTTP POSTs to server for registering a new user to the database.
    * users.js - Admin Route used by admin tools to create / update / delete users from database.
    * groups.js - Admin Route used by admins tools to create / update / delete groups and channels from the database.
    * accounts.js - Route used by the server to handle HTTP Posts to update user account information and store profile pictures on the server and database.
5. MongoDB
    * Database System - Used to Store all the Users, Groups and Channels related to the Chat-App
    * Collections:
        * Users - Collection that stores users.
            * Username - Account Username
            * Password - Account Password
            * Role - Account Role
            * Profile Picture - Account Profile Picture Path

#### Functions:
* Io.on(‘connection’) – handles all socket functions and requests made by users connected to the server.
* Socket.on(‘add-message’, message) – Communicates ‘message’ to all users connected to the socket.
* Socket.on(‘join-channel’, joinchannel, joinmessage) – Handles requests by users to join selected channel for chat. Broadcasts Join Message to new channel to notify new channel users upon entry
* Socket.on('leave-channel', leavechannel, leavemessage) - Leaves old channel when user joins new channel, Relays Leave Message to old channel to notify old channel users upon exit.

### Git Repository
Github: github.com/MrKSM/Chat-App

#### Branches:
##### Master
The master branch contains all the stable milestones achieved during app development. This branch serves as a reference point of each stable change and milestone committed during application development.

##### Project Development
This serves as a temporary development branch used to test new features and coding additions currently being developed for implementation into the application. This branch is merged and deleted upon development of stable code into the master branch. Used to test new features such as chat development and login functions.