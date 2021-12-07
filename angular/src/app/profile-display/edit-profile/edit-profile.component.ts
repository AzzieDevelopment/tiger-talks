import { Component, Input, OnInit, Output } from '@angular/core';
import { IFaculty, IStudent, IUser, UserType } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  titles = ['Dr.', 'Professor', 'Assistant Professor', 'Adjunct', 'Teaching Assistant', 'Secretary', 'Staff'];
  signUpData:any = {
    userType: "", 
    title: "",
    acceptTerms: false
  }
  
  // @Output() 
  user!: IUser;
  studentInfo?: IStudent;
  facultyInfo?: IFaculty;
  userSub: any; // subscription for user data
  userInfoSub: any;

  ngOnInit(): void {
    this.userSub = this.userService.getUser(this.authService.getNetID()).subscribe(
      data => {
        this.user = data;
        // this.user.PName = data.PName;
        console.log(data)
        if (this.isStudent()) {
          this.getStudentInfo();
        } else if (this.isFaculty()) {
          this.getFacultyInfo();
        }
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.userInfoSub?.unsubscribe();
  }

  getStudentInfo() {
    this.userInfoSub = this.userService.getStudent(this.user.Id).subscribe(
      data => {
        this.studentInfo = data;
        console.log(data);
      },
      err => console.log(err)
    );
  }

  getFacultyInfo() {
    this.userInfoSub = this.userService.getFaculty(this.user.Id).subscribe(
      data => {
        this.facultyInfo = data;
      },
      err => console.log(err)
    );
  }

  isStudent(): boolean {
    return this.user.UserType === UserType.Student;
  }

  isFaculty(): boolean {
    return this.user.UserType === UserType.Faculty;
  }
  
  isModerator(): boolean {
    return this.user.Permission == 1;
  }
}
