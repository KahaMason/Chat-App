import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username:string = '';
  password:string = '';

  constructor(private router: Router, private form: FormsModule, private authservice: AuthService) { }

  ngOnInit() {
    // Responds if User is already currently logged in. Redirect to Chat.
    if (sessionStorage.getItem('username')) {
      alert("User is already logged in as: " + sessionStorage.getItem('username') );
      this.router.navigateByUrl('chat');
    }
  }

  // Login Function when login form is submitted to Auth Service.
  userLogin () {
    this.authservice.login(this.username, this.password).subscribe(
      data => {
        // Assign returned Auth Data to Session Storage
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('role', data.role);
        this.router.navigateByUrl('chat');
      },
      error => { 
        // Notify User upon return of Authentication Error
        alert('Username and Password were incorrect');
        this.username = '';
        this.password = '';
      }
    );
  }
}
