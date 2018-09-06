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
    }
  }

  // Login Function when login form is submitted
  userLogin (event) {
    event.preventDefault();

    sessionStorage.setItem("username", this.username);

    this.router.navigateByUrl('chat');
  }

}
