import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() { }
  
  // Default Chatroom
  defaultChannel(username) {
    this.socket.emit('default-channel', username);
  }

  // Join Chatroom Channel
  joinChannel(joinchannel, joinmessage) {
    this.socket.emit('join-channel', joinchannel, joinmessage);
  }

  // Leave Chatroom Channel
  leaveChannel(leavechannel, leavemessage) {
    this.socket.emit('leave-channel', leavechannel, leavemessage);
  }

  // Send Message to server to be transmitted over chat.
  sendMessage(channel, message) {
    this.socket.emit('add-message', channel, message);
  }

  // Retrieve stream of messages from server that were transmitted over chat.
  getMessages() {
    let obmessages = new Observable(observer => {
      this.socket = io();
      
      this.socket.on('message', (message) => {observer.next(message);});

      return () => {this.socket.disconnect();}
    });
    
    return obmessages;
  }
}
