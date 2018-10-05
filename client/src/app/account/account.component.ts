import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // NG Bindings for Account Details
  username:string = sessionStorage.getItem('username');
  profilepic = "";
  
  // NG Bindings for Updating Passwords
  currentpassword:string = '';
  newpassword:string = '';
  confirmpassword:string = '';
  
  // NG Bindings for Uploading a Profile Image
  selectedfile = null;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    // User is logged in Check
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert('User is not logged in');
      this.router.navigateByUrl('login');
    } else {
      // Call Account Service to Recieve Account Details
      this.accountService.getaccountdetails(this.username).subscribe(data => {
        // Display Current Account Profile Picture
        this.profilepic = data.profilepic;
      });
    }
  }

  // Sends request to server to update Account Password
  updatePassword() {
    // Checks if User has successfully confirm new password input
    if (this.newpassword !== this.confirmpassword) {
      alert("Cannot Confirm New Password, Please try again");
      // Reset NG Fields
      this.newpassword = '';
      this.confirmpassword = '';
    } 
    
    // Sends Password Inputs to Server to validate if Account Password can be Updated
    else {
      // Call Account Service to Send and Update Account Password
      this.accountService.updatepassword(this.username, this.currentpassword, this.newpassword).subscribe(data => {
        // Perform Response Data Checks
        if (data.success == true) {
          alert("Successfully Updated Account Password");
        } else if (data.success == false) {
          alert("Current Password does not match Account Password");
        }
      });
      // Reset NG Fields
      this.currentpassword = '';
      this.newpassword = '';
      this.confirmpassword = '';
    }
  }

  // Store the Selected Profile Picture File to Variable
  onFileSelected(event) {
    console.log(event);
    this.selectedfile = event.target.files[0];
  }

  // Perform Upload and Update of Account Profile Picture to Server Database
  onUpload() {
    // Construct new Form to Upload Image
    const fd = new FormData();
    fd.append('image', this.selectedfile, this.selectedfile.name);
    
    // Call Account Service to Upload Selected Image to Database
    this.accountService.imgupload(fd).subscribe(res => {
      console.log(res.data.filename + " , " + res.data.size);
      
      // Call Account Service that Updates the Account's Profile Picture with Uploaded Image
      this.accountService.updateprofilepic(this.username, res.data.filename).subscribe(res => {
        // Update Current Profile Picture
        this.profilepic = res.profilepic;
      });
    });
  }
}
