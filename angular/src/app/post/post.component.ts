import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IPost } from '../models/post';
import { IFaculty, IStudent, IUser, UserType } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post!: IPost;
  user!: IUser;
  studentInfo?: IStudent;
  facultyInfo?: IFaculty;
  userSub: any; // subscription for user data
  userInfoSub: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSub = this.userService.getUser(this.post?.UserId).subscribe(
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
        console.log(data);
        this.studentInfo = data;
      },
      err => console.log(err)
    );
  }

  getFacultyInfo() {
    this.userInfoSub = this.userService.getFaculty(this.user.Id).subscribe(
      data => {
        console.log(data);
        this.facultyInfo = data;
      },
      err => console.log(err)
    );
  }

  getInfo() {
    let info = "";
    if (this.studentInfo) {
      info = (this.studentInfo?.Major + " Major");
    } else if (this.facultyInfo) {
      info = (this.facultyInfo?.Department + " Department");
    }
    return info;
  }
}
