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
  
  // Create a new channel to be available to user.
  addChannel(channel) {
    this.socket.emit('add-channel', channel);
  }
  
  // Change to selected chatroom channel.
  joinChannel(channel) {
    this.socket.emit('join-channel', channel);
  }

  // Retrieves stream of channel updates sent by the server to users.
  getChannels() {
    let obchannels = new Observable(observer => {
      this.socket = io();

      this.socket.on('channel', (channel) => {observer.next(channel);});

      return () => {this.socket.disconnect();}
    });

    return obchannels;
  }

  // Send Message to server to be transmitted over chat.
  sendMessage(message) {
    this.socket.emit('add-message', message);
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
