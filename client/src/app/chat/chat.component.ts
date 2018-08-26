import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;
  messages: string[] = [];
  connection;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.connection = this.socketService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
      this.message = '';
    });
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
  }

  ngOnDestroy() {
    if(this.connection) {
      this.connection.unsubscribe();
    }
  }

  logout() {
    sessionStorage.clear();
    console.log("User has logged out - Session Cleared");
  }
}
