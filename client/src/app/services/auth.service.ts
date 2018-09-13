import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interface for Server to reference Auth Data to client.
export interface user {
  username: string;
  role: string;
  success: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  // POST Login data to Server Authentication
  login(username:string, password:string) {
    return this.http.post<user>('/api/auth', { username:username, password:password });
  }
}
