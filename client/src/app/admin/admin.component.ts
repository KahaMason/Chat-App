import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  username: string = sessionStorage.getItem('username');
  role: string = sessionStorage.getItem('role');

  users = [];
  groups = [];

  newuser: string;
  newuseremail: string;
  selecteduser: string;
  changeuserrole: string;
  deleteusername: string;
  groupname: string;
  groupselect: string;
  channelname: string;
  deletegroupname: string;
  deletechannelname: string;

  constructor(private router: Router, private form: FormsModule, private adminservice: AdminService) { }

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

    else {
      this.adminservice.fetchUsers().subscribe(data => this.users = data);
      this.adminservice.fetchGroups().subscribe(data => this.groups = data);
    }
  }

  // Register New User to Server
  registerUser() {
    this.adminservice.registeruser(this.newuser).subscribe(
      data => {
        if (data.success == true) {
          alert("User " + data.username + " has been successfully created");
        }
        
        else if (data.success == false) {
          alert("User " + data.username + " already exists");
        }
      },
      error => {alert("Error: " + error);});
  }

  // Delete a User
  deleteUser() {
    console.log(this.deleteusername);
  }

  // Change the role of a User
  changeRole() {
    this.adminservice.updaterole(this.selecteduser, this.changeuserrole).subscribe(
      data => {
        if (data.success == true) {
          alert("User '" + data.username + " ' has been changed to '" + data.role + " '");
        } else if (data.success == false) {
          alert(data.username + " has not changed role");
        }
      }
    )
  }
  
  // Create new Group to Server
  createGroup() {
    this.adminservice.creategroup(this.groupname).subscribe(
      data => {
        if (data.success == true) {
          alert("Group '" + data.groupname + " ' has been created");
        }

        else if (data.success == false) {
          alert("Group '" + data.groupname + " ' already exists");
        }
      },
      error => {alert("Error: " + error);});
  }
  
  // Create a new Channel
  createChannel() {
    this.adminservice.createchannel(this.groupselect, this.channelname).subscribe(
      data => {
        if (data.success == true) {
          alert("Channel '" + data.channelname + " ' has been created in group '" + data.groupname + " '");
        }

        else if (data.success == false) {
          alert("Channel '" + data.channelname + " ' already exists in group");
        }
      }
    );
  }

  // Delete a Group
  deleteGroup() {
    console.log(this.deletegroupname);
  }

  // Delete a Channel from a Group
  deleteChannel() {
    console.log(this.deletechannelname);
  }
}
