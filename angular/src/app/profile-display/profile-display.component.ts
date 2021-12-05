import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @Input() 
  user!: IUser;
  studentInfo?: IStudent;
  facultyInfo?: IFaculty;
  numComments: number = 0;
  userSub: any; // subscription for user data
  userInfoSub: any;

  ngOnInit(): void {
    this.userSub = this.userService.getUser(this.authService.getNetID()).subscribe(
      data => {
        this.user = data;
        if (this.user.UserType === UserType.Student) {
          this.getStudentInfo();
        } else if (this.user.UserType === UserType.Faculty) {
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

}
