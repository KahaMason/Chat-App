import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;  // Stores chat message
  messages: string[] = []; // Stores collection of chat messages
  newchannel: string;
  channels: string[] = [];

  username: string = sessionStorage.getItem('username');
  channelfeed;
  messagefeed;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit() {
    // Checks if there is a stored username value from login and redirects to login page if not found.
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert('User has not logged In');
      this.router.navigateByUrl('login');
      
    }
    
    // If Login confirmed, subsribe to socket.
    else {
      
      // Subscribes to Channel Feed with new Channels added.
      this.channelfeed = this.socketService.getChannels().subscribe((newchannel: string) => {
        this.channels.push(newchannel);
        this.newchannel = '';
      });
      
      // Subscribes to Message Feed with chat messages sent / recieved.
      this.messagefeed = this.socketService.getMessages().subscribe((message: string) => {
        this.messages.push(message);
        this.message = '';
      });

    }
  }
  
  // Creates a new chat channel for all users.
  addNewChannel() {
    this.socketService.addChannel(this.newchannel);
  }

  // Join a new chat channel
  joinChannel(channel) {
    this.socketService.joinChannel(channel);
  }

  // Sends message to all connected chat members over the server socket.
  sendMessage() {
    this.socketService.sendMessage('(' + this.username + '): ' + this.message);
  }

  ngOnDestroy() {
    // Unsubscribe from Message Feed when leaving.
    if(this.messagefeed) {
      this.messagefeed.unsubscribe();
    }

    // Unsubscribe from Channel Feed when leaving.
    if(this.channelfeed) {
      this.channelfeed.unsubscribe();
    }
  }

  // Logout Function
  logout() {
    sessionStorage.clear();
    console.log("User has logged out - Session Cleared");
    this.router.navigateByUrl('login');
  }
}
