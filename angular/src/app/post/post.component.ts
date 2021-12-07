import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from '../models/post';
import { IFaculty, IStudent, IUser, UserType } from '../models/user';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post!: IPost;
  isFlagged: boolean = false;
  numComments: number = 0;
  user!: IUser;
  studentInfo?: IStudent;
  facultyInfo?: IFaculty;
  userSub!: Subscription; // subscription for user table data
  userInfoSub!: Subscription; // subscription for user type info data (faculty/student)
  upvoteSub?: Subscription;
  flagPostSub?: Subscription;
  deletePostSub?: Subscription;
  checkIfFlaggedSub?: Subscription;
  isAllDataLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
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
        this.checkIfUserFlaggedPost();
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
    this.flagPostSub?.unsubscribe();
    this.deletePostSub?.unsubscribe();
    this.checkIfFlaggedSub?.unsubscribe();
  }

  isPostOwner(): boolean {
    return this.post?.UserId === this.authService.getNetID();
  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  private allDataIsVerified() {
    this.isAllDataLoaded = true;
  }

  checkIfUserFlaggedPost() {
    if (!this.authService.loggedIn()) {
      this.isFlagged = false;
    } else {
      this.checkIfFlaggedSub = this.postService.checkIfUserFlaggedPost(this.post?.Id).subscribe(
        data => {
          this.isFlagged = data.isFlagged;
        },
        err => console.log(err)
      );
    }
  }

  getStudentInfo() {
    this.userInfoSub = this.userService.getStudent(this.user.Id).subscribe(
      data => {
        this.studentInfo = data;
        this.allDataIsVerified();
      },
      err => console.log(err)
    );
  }

  getFacultyInfo() {
    this.userInfoSub = this.userService.getFaculty(this.user.Id).subscribe(
      data => {
        this.facultyInfo = data;
        this.allDataIsVerified();
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

  flagPost() {
    this.flagPostSub = this.postService.flagPost(this.post).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['signin']);
          } else if (err.status === 403) {
            console.log('already flagged this post');
          } else {
            console.log(err);
          }
        }
      }
    );
  }

  redirectToEditPost() {
    this.router.navigate(['editpost', this.post?.Id]);
  }

  deletePost() {
    this.deletePostSub = this.postService.deletePost(this.post?.Id).subscribe(
      data => {
        this.router.navigate(['home']);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['signin']);
          } else if (err.status === 404) {
            this.router.navigate(['404']);
          } else {
            console.log(err);
          }
        }
      }
    );
  }

}
