import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  signout() {
    this.authService.logoutUser().subscribe(
      res => {
        this.router.navigate(['home']);
      },
      err => console.log(err)
    );
    this.router.navigate(['home']);
  }

}
