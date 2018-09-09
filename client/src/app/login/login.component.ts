import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router, private form: FormsModule) { }

  ngOnInit() {
    // Responds if User is already currently logged in. Redirect to Chat.
    if (sessionStorage.getItem('username')) {
      alert("User is already logged in as: " + sessionStorage.getItem('username') );
      this.router.navigateByUrl('chat');
    }
  }

  // Login Function when login form is submitted
  userLogin (event) {
    event.preventDefault();

    if (this.username == "Mr KSM") {
      sessionStorage.setItem("username", this.username);
      sessionStorage.setItem("role", "Super Admin");
      this.router.navigateByUrl('chat');
    } 
    
    else if (this.username == "Group KSM") {
      sessionStorage.setItem("username", this.username);
      sessionStorage.setItem("role", "Group Admin");
      this.router.navigateByUrl('chat');
    }

    else if (this.username == "KSM") {
      sessionStorage.setItem("username", this.username);
      sessionStorage.setItem("role", "User");
      this.router.navigateByUrl('chat');
    }

    else {
      alert("User Not Found");
      this.username = '';
      this.password = '';
    }
  }

}
