import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IUser, Permission } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user!: IUser | undefined;
  userSub: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    if (this.loggedIn()) {
      this.userSub = this.userService.getUser(this.authService.getNetID()).subscribe(
        data => {
          this.user = data;
          console.log("navbar init")
        },
        err => console.log(err)
      );
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  isModerator() {
    return (this.user?.Permission == Permission.Moderator);
  }

  signout() {
    this.authService.logoutUser().subscribe(
      res => {
        this.user = undefined;
        this.router.navigate(['home']);
      },
      err => console.log(err)
    );
    this.router.navigate(['home']);
  }

}