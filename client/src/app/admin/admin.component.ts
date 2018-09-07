import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string = sessionStorage.getItem('username');
  role: string = sessionStorage.getItem('role');

  constructor(private router: Router) { }

  ngOnInit() {
    if(!sessionStorage.getItem('username')) {
      alert("User is not logged in");
      this.router.navigateByUrl('login');
    }

    if(sessionStorage.getItem('username') && this.role != ("Super User" || "Group Admin")) {
      alert("User is not authorised to access Administrator Tools");
      this.router.navigateByUrl('chat');
    }
  }
}
