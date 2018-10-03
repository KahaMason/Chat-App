import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface user {
  username: string;
  role: string;
  success: boolean;
}

export interface group {
  groupname: string;
  success: boolean;
}

export interface channel {
  groupname: string;
  channelname: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http: HttpClient) { }

  // Server User Registration HTTP
  registeruser(username:string) {
    return this.http.post<user>('api/admin/reg', { username:username });
  }

  // Server Update User Role HTTP
  updaterole(username:string, role:string) {
    return this.http.post<user>('/api/admin/users/updaterole', { username:username, role:role});
  }

  // Server Delete User HTTP
  deleteuser(username:string) {
    return this.http.post<user>('/api/admin/users/deleteuser', { username:username });
  }
  
  // Server Create Group HTTP
  creategroup(groupname:string) {
    return this.http.post<group>('/api/admin/groups/creategroup', { groupname:groupname});
  }

  // Server Delete Group HTTP
  deletegroup(groupname:string) {
    return this.http.post<group>('/api/admin/groups/deletegroup', { groupname:groupname });
  }

  // Server Create Channel HTTP
  createchannel(groupname:string, channelname:string) {
    return this.http.post<channel>('/api/admin/groups/createchannel', {groupname:groupname, channelname:channelname});
  }

  // Server Delete Channel HTTP
  deletechannel(groupname:string, channelname:string) {
    return this.http.post<channel>('/api/admin/groups/deletechannel', {groupname:groupname, channelname:channelname});
  }

  // Server Fetch User List
  fetchUsers(): Observable<user[]> {
    return this.http.post<user[]>('/api/admin/users/fetchdata', {});
  }

  // Server Fetch Group Data
  fetchGroups(): Observable<group[]> {
    return this.http.post<group[]>('/api/admin/groups/fetchdata', {});
  }
}