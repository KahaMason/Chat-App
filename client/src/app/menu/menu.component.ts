import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    if(sessionStorage.getItem('username')) {
      sessionStorage.clear();
      this.router.navigateByUrl('login');
    }

    else {
      alert("User has already been logged out");
    }
  }

}
