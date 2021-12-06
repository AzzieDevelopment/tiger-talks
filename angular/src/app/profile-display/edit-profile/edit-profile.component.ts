import { Component, Input, OnInit, Output } from '@angular/core';
import { IFaculty, IStudent, IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // @Output() 
  user!: IUser;
  studentInfo?: IStudent;
  facultyInfo?: IFaculty;
  userSub: any; // subscription for user data
  userInfoSub: any;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.userService.getUser(this.authService.getNetID()).subscribe(
      data => {
        this.user = data;
        // this.user.PName = data.PName;
        console.log(data)

        // if (this.user.UserType === UserType.Student) {
        //   this.getStudentInfo();
        // } else if (this.user.UserType === UserType.Faculty) {
        //   this.getFacultyInfo();
        // }
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
