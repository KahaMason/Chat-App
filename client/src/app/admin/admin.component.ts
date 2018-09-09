import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string = sessionStorage.getItem('username');
  role: string = sessionStorage.getItem('role');

  newuser: string;
  newuseremail: string;
  selecteduser: string;
  changeuserrole: string;
  groupname: string;
  groupselect: string;
  channelname: string;

  constructor(private router: Router, private form: FormsModule) { }

  ngOnInit() {
    // Verifies if user has logged in.
    if(!sessionStorage.getItem('username')) {
      alert("User is not logged in");
      this.router.navigateByUrl('login');
    }

    // Verifies if User role has authorised access to admin tools.
    if(sessionStorage.getItem('username') && this.role !== "Super Admin" && this.role !== "Group Admin") {
      alert("User is not authorised to access Administrator Tools");
      this.router.navigateByUrl('chat');
    }
  }

  createUser(event) {
    console.log("Creating User: " + this.newuser);
    console.log("Email: " + this.newuseremail);
    this.newuser = '';
    this.newuseremail = '';
  }

  changeRole() {
    console.log("Change user: " + this.selecteduser);
    console.log("Role: " + this.changeuserrole);
    this.selecteduser = '';
    this.changeuserrole = '';

  }

  createGroup() {
    console.log(this.groupname);
    this.groupname = '';
  }

  createChannel() {
    console.log("Creating Channel: " + this.channelname + " in group: " + this.groupselect);
    this.groupselect = '';
    this.channelname = '';
  }

  deleteGroup() {}
  deleteChannel() {}
  removeUserFromChannel() {}

}
