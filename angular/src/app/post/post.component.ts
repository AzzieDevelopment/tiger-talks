import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from '../models/post';
import { IFaculty, IStudent, IUser, UserType } from '../models/user';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post!: IPost;
  numComments: number = 0;
  user!: IUser;
  studentInfo?: IStudent;
  facultyInfo?: IFaculty;
  userSub!: Subscription; // subscription for user table data
  userInfoSub!: Subscription; // subscription for user type info data (faculty/student)
  upvoteSub?: Subscription;
  isAllDataLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router) { }

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
    this.postService.getNumberOfComments(this.post?.Id).subscribe(
      data => {
        this.numComments = data.NumComments;
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.userInfoSub?.unsubscribe();
    this.upvoteSub?.unsubscribe();
  }

  getStudentInfo() {
    this.userInfoSub = this.userService.getStudent(this.user.Id).subscribe(
      data => {
        this.studentInfo = data;
        this.isAllDataLoaded = true;
      },
      err => console.log(err)
    );
  }

  getFacultyInfo() {
    this.userInfoSub = this.userService.getFaculty(this.user.Id).subscribe(
      data => {
        this.facultyInfo = data;
        this.isAllDataLoaded = true;
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
  
  goToTigerSpace() {
    this.router.navigate(['tigerspace', this.post.TigerSpaceId]);
  }

  commentRedirect(postId: any){
    this.router.navigate([`comments/${postId}`]);
  }

  getUserType(): string {
    if (this.user?.UserType === UserType.Student) {
      return "Student";
    } else {
      return "Faculty"
    }
  }

  getUserName() : string {
    return this.user?.FirstName + ' ' + this.user?.LastName 
  }

  upvotePost() {
    this.upvoteSub = this.postService.upvotePost(this.post?.Id).subscribe(
      data => {
        window.location.reload();
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['signin']);
          }
        }
      }
    );
  }

}
