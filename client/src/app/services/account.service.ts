import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface account {
  username:string;
  role:string;
  profilepic:string
  success:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // Server Retrieve Account Details HTTP
  getaccountdetails(username) {
    return this.http.post<account>('/api/accounts/users/getdetails', {username:username});
  }

  // Server Update Account Password HTTP
  updatepassword(username, currentpassword, newpassword) {
    return this.http.post<account>('/api/accounts/users/updatepassword', {username:username, password:currentpassword, newpassword:newpassword});
  }

  // Upload Profile Picture HTTP
  imgupload(fd) {
    return this.http.post<any>('/api/accounts/users/imgupload', fd);
  }

  // Server Update Account Profile Picture HTTP
  updateprofilepic(username, profilepic) {
    return this.http.post<any>('/api/accounts/users/updateprofilepic', {username:username, profilepic:profilepic});
  }
}
