import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IFaculty, IStudent, IUser, UserType } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit, OnDestroy{

  constructor(private userService: UserService, private authService: AuthService) { }

  // @Input() 
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
