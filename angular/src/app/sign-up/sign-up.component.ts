import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFaculty, IStudent, IUser, Permission, UserType } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  pageTitle: string = "Sign Up";
  titles = ['Dr.', 'Professor', 'Assistant Professor', 'Adjunct', 'Teaching Assistant', 'Secretary', 'Staff'];
  signUpData:any = {
    userType: "", 
    title: "",
    acceptTerms: false
  }
  passwordsMatch = true;
  validEmail = true;
  errorMsg: string = "";
  registerUserSub: any; // subscription for registering basic user info
  registerUserDetailsSub: any; // subscription for registering user type info (student/faculty)
  
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.registerUserSub?.unsubscribe();
    this.registerUserDetailsSub?.unsubscribe();
  }

  validatePasswords() {
    if (this.signUpData?.verifyPassword !== this.signUpData?.password) {
      this.passwordsMatch = false;
    } else {
      this.passwordsMatch = true;
    }
  }

  // validateEmail() {
  //   let pattern = new RegExp('^[A-Za-z0-9._%+-]+(@towson.edu|@students.towson.edu)$');
  //   this.validEmail = pattern.test(this.signUpData.email);
  // }

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

  isStudent(): boolean {
    return this.signUpData.userType === "student";
  }

  isFaculty(): boolean {
    return this.signUpData.userType === "faculty";
  }

  onSubmit() {
    let user: IUser = this.getUserData();

    // register user data
    this.registerUserSub = this.authService.registerUser(user).subscribe(
      data => {
        console.log('Success!', data);
        if (this.isStudent()) {
          let student: IStudent = this.getStudentData();

          // register student data
          this.registerUserDetailsSub = this.authService.registerStudent(student).subscribe(
            data => {
              this.redirectToSignIn();
            },
            err => console.log(err)
          );
        } else if (this.isFaculty()) {
          let faculty: IFaculty = this.getFacultyData();
          console.log("Faculty", faculty);

          // register faculty data
          this.registerUserDetailsSub = this.authService.registerFaculty(faculty).subscribe(
            data => {
              console.log(data);
              this.redirectToSignIn();
            },
            err => console.log(err)
          );
        }
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

  getUserType(): number {
    if (this.isStudent()) {
      return UserType.Student;
    } else if (this.isFaculty()) {
      return UserType.Faculty;
    }
    return UserType.Student; // needed end return statement
  }

  private getUserData(): IUser {
    return {
      Id: this.signUpData.netID,
      FirstName: this.signUpData.firstName,
      LastName: this.signUpData.lastName,
      Email: this.signUpData.email,
      UserType: this.getUserType(),
      Permission: Permission.Basic,
      Bio: this.signUpData.bio || '',
      PName: this.signUpData.preferredName || '',
      Pronouns: this.signUpData.pronouns || '',
      Password: this.signUpData.password
    };
  }

  private getStudentData(): IStudent {
    return {
      UserId: this.signUpData.netID,
      Major: this.signUpData.major,
      Minor: this.signUpData.minor || '',
      Track: this.signUpData.track || '',
      GradYear: this.signUpData.gradYear || ''
    };
  }

  private getFacultyData(): IFaculty {
    return {
      UserId: this.signUpData.netID,
      Title: this.signUpData.title,
      Department: this.signUpData.department
    }
  }

}
