import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { AdminService } from '../services/admin.service';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // NG Binds for Chat Log and Messages
  message: string;  // Stores chat message
  messages: string[] = []; // Stores collection of chat messages
  
  // NG Binds for User, Groups and Channels List
  users;
  groups;

  // NG Binds for Account Details
  username: string = sessionStorage.getItem('username');
  role;
  profilepic;
  currentgroup:string = sessionStorage.getItem('currentgroup');
  currentchannel:string = sessionStorage.getItem('currentchannel');

  // Subscription Refresh
  obrefresh;
  
  // Subscription Feeds
  accountfeed;
  userfeed;
  groupfeed;
  messagefeed;

  // Ng Form Binds for Admin Tools
  newuser: string;
  newchannel: string;
  newgroup: string;
  selecteduser: string;
  selectedgroup: string;
  newrole: string;
  deleteuser: string;
  deletegroup: string;
  deletechannelgroup: string;
  deletechannel: string;

  constructor(private socketService: SocketService, private adminService: AdminService, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    // User is logged in Check
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert('User is not logged in');
      this.router.navigateByUrl('login');
    }
    
    // If Login confirmed, subsribe to socket.
    else {
      // Refresh Observable Subscriptions every Second
      let obtimer = timer(1000, 1000);
      this.obrefresh = obtimer.subscribe(data => {

        // Subscribe to Account Feed to retrieve Observable data of Account Details
        this.accountfeed = this.accountService.getaccountdetails(this.username).subscribe(data => {
          // Display Account Details
          this.role = data.role;
          this.profilepic = data.profilepic;
        });
        
        // Subscribe to Channel Feed to retrieve Observable Data of Stored Users
        this.userfeed = this.adminService.fetchUsers().subscribe(data => {
          // Display User List
          this.users = data;
        });

        // Subscribe to Channel Feed to retrieve Observable Data of Stored Groups
        this.groupfeed = this.adminService.fetchGroups().subscribe(data => {
          // Display Groups and Channels
          this.groups = data;
        });
      });
      
      // Subscribes to Message Feed with chat messages sent / recieved.
      this.messagefeed = this.socketService.getMessages().subscribe((message: string) => {
        // Update Messages
        this.messages.push(message);
        this.message = '';
      });

      // Join Default Channel Upon Entering Chat
      this.socketService.defaultChannel(this.username);
    }
  }
  
  // Register a New User to the Chat-Application
  registerUser() {
    this.adminService.registeruser(this.newuser).subscribe(
      data => {
        // Perform Respone Data Checks
        if (data.success == true) {
          alert("User " + data.username + " has been successfully created");
        } else if (data.success == false) {
          alert("User " + data.username + " already exists");
        }
        this.newuser = '';
      },
      error => {alert("Error: " + error);});
  }
  
  // Update an Existing User's Role
  updateRole() {
    this.adminService.updaterole(this.selecteduser, this.newrole).subscribe(
      data => {
        // Perform Response Data Checks
        if (data.success == true) {
          alert("User '" + data.username + "' has been changed to '" + data.role + "'");
        } else if (data.success == false) {
          alert(data.username + " has not changed role");
        }
        this.selecteduser = '';
        this.newrole = '';
      }
    );
  }

  // Delete a User from Chat-App
  deleteUser() {
    this.adminService.deleteuser(this.deleteuser).subscribe(
      data => {
        // Perform Response Data Checks
        if (data.success == true) {
          alert("User '" + data.username + "' has been deleted");
        } else if (data.success == false) {
          alert("Failed to delete User");
        }
        this.deleteuser = '';
      }
    );
  }

  // Create a new Group
  createGroup() {
    this.adminService.creategroup(this.newgroup).subscribe(
      data => {
        // Perform Response Data Checks
        if (data.success == true) {
          alert("Group '" + data.groupname + "' has been created");
        } else if (data.success == false) {
          alert("Group '" + data.groupname + "' already exists");
        }
        this.newgroup = '';
      }
    );
  }

  // Delete an Existing Group
  deleteGroup() {
    this.adminService.deletegroup(this.deletegroup).subscribe(
      data => {
        // Perform Response Data Checks
        if (data.success == true) {
          alert("Group '" + data.groupname + "' has been deleted")
        } else if (data.success == false) {
          alert("Error: Group Not Found");
        }
        this.deletegroup = '';
      }
    );
  }

  // Create a new Channel for Chat-Application
  createChannel() {
    console.log("Creating Channel");
    this.adminService.createchannel(this.selectedgroup ,this.newchannel).subscribe(
      data => {
        // Perform Response Data Checks
        if (data.success == true) {
          alert("Channel '" + data.channelname + " ' has been created");
        } else if (data.success == false) {
          alert("Channel '" + data.channelname + " ' already exists in Group '" + data.groupname +"'");
        }
        this.newchannel = '';
      }
    );
  }

  // Delete a Channel from Group
  deleteChannel() {
    this.adminService.deletechannel(this.deletechannelgroup, this.deletechannel).subscribe(
      data => {
        // Perform Response Data Checks
        if (data.success == true) {
          alert("Channel " + data.channelname + " has been deleted from " + data.groupname);
        } else if (data.success == false) {
          alert("Channel doesn't exist in " + data.groupname);
        }
        this.deletechannelgroup = '';
        this.deletechannel = '';
      }
    );
  }

  // Join a new chat channel
  joinChannel(group, channel) {
    if (group !== this.currentgroup && channel !== this.currentchannel) {
      var leavechannel = (this.currentgroup +  " " + this.currentchannel); // Store Current Channel
      var leavemessage = (this.username + " has left the channel"); // Create a Message to Broadcast to Old Channel
      var joinchannel = (group + " " + channel); // Store Selected Channel
      var joinmessage = (this.username + " has joined " + channel); // Create a Message to Broadcast to New Channel
      this.messages = []; // Reset Chat Messages

      // Disconnect from Current Channel and Join New Channel
      this.socketService.leaveChannel(leavechannel, leavemessage);
      this.socketService.joinChannel(joinchannel, joinmessage);
      
      // Update Current Channel when joining New Channel
      this.currentgroup = group;
      this.currentchannel = channel;
    }
  }

  // Sends message to all connected chat members in channel
  sendMessage() {
    var channel = (this.currentgroup + " " + this.currentchannel); // Store Current Channel
    var message = ('(' + this.username + '): ' + this.message); // Create message to send to Current Channel
    this.socketService.sendMessage(channel, message);
  }

  ngOnDestroy() {
    // Unsubscribe from Feeds
    if (this.obrefresh) {this.obrefresh.unsubscribe(); console.log("Unsubscribed from OB Refresh");}
    if (this.accountfeed) {this.accountfeed.unsubscribe(); console.log("Unsubscribed from Account Feed");}
    if (this.userfeed) {this.userfeed.unsubscribe(); console.log("Unsubscribed from UserFeed");}
    if (this.groupfeed) {this.groupfeed.unsubscribe(); console.log("Unsubscribed from GroupFeed");}
    if (this.messagefeed) { this.messagefeed.unsubscribe(); console.log("Unsubscribed from MessageFeed");}
  }
}