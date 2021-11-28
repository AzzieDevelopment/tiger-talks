import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  pageTitle: string = "Sign Up";
  signUpData:any = { 
    acceptTerms: false
  }
  passwordsMatch = true;
  validEmail = true;
  errorMsg: string = "";
  subscription: any;
  
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  validatePasswords() {
    if (this.signUpData?.verifyPassword !== this.signUpData?.password) {
      this.passwordsMatch = false;
    } else {
      this.passwordsMatch = true;
    }
  }

  validateEmail() {
    let pattern = new RegExp('^[A-Za-z0-9._%+-]+(@towson.edu|@students.towson.edu)$');
    this.validEmail = pattern.test(this.signUpData.email);
  }

  togglePassword() {
    let icon = document.getElementById('togglePassword');
    let password = document.getElementById('password');

    // switch input type
    const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
    password?.setAttribute('type', type);

    // toggle icon slash
    icon?.classList.toggle('bi-eye');
  }

  toggleVerify() {
    let icon = document.getElementById('toggleVerify');
    let password = document.getElementById('verifyPassword');

    // switch input type
    const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
    password?.setAttribute('type', type);
    
    // toggle icon slash
    icon?.classList.toggle('bi-eye');
  }

  onSubmit() {
    let user: IUser = this.getUserData();

    this.subscription = this.authService.registerUser(user).subscribe(
      data => {
        console.log('Success!', data);
        this.redirectToSignIn();
      },
      error => {
        if (error.status === 403) {
          this.errorMsg = 'User with this Net ID or Email already exists';
        }
      }
    );
  }

  private redirectToSignIn() {
    // redirect to sign in page
    this.router.navigate(['signin']);
  }

  private getUserData(): IUser {
    console.log('[', this.signUpData.bio.trim(), ']');
    return {
      Id: this.signUpData.netID,
      FirstName: this.signUpData.firstName,
      LastName: this.signUpData.lastName,
      Email: this.signUpData.email,
      UserType: 1,
      Permission: 1,
      Bio: this.signUpData.bio.trim(),
      PreferredName: this.signUpData.preferredName,
      Pronouns: this.signUpData.pronouns,
      Password: this.signUpData.password
    };
  }

}
