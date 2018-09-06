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
  username: string = sessionStorage.getItem('username');
  connection;

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
      this.connection = this.socketService.getMessages().subscribe((message: string) => {
        this.messages.push(message);
        this.message = '';
      });
    }
  }
  
  // Sends message to all connected chat members over the server socket.
  sendMessage() {
    this.socketService.sendMessage('(' + this.username + '): ' + this.message);
  }

  ngOnDestroy() {
    // Unsubscribe from socket when navigating away from chat page.
    if(this.connection) {
      this.connection.unsubscribe();
    }
  }

  // Logout Function
  logout() {
    sessionStorage.clear();
    console.log("User has logged out - Session Cleared");
    this.router.navigateByUrl('login');
  }
}
