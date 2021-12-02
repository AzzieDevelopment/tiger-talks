import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  pageTitle:string = "Sign In";
  loginUserData: any = {};
  error: any = { }
  subscription: any;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loginUser() {
    this.subscription = this.auth.loginUser(this.loginUserData).subscribe(
      res => {
        this.router.navigate(['/home']);
      },
      error => {
        if (error.status === 403) {
          this.error.message = 'Please verify email address.';
          this.error.type = 403;
        } else if (error.status === 401) {
          this.error.message = 'Invalid Net ID or Password.';
          this.error.type = 401;
        }
      }
    );
  }

  resend() {
    this.subscription = this.auth.resendEmail(this.loginUserData?.netID).subscribe(
      res => console.log('Email sent!', res),
      error => console.log('Error!', error)
    );
  }

}
