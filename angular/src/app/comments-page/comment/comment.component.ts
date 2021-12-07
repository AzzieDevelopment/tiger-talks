import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IComment } from 'src/app/models/comment';
import { IFaculty, IStudent, IUser, UserType } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() comment!: IComment;
  isFlagged: boolean = false;
  user!: IUser;
  studentInfo?: IStudent;
  facultyInfo?: IFaculty;
  userSub!: Subscription; // subscription for user table data
  userInfoSub!: Subscription; // subscription for user type info data (faculty/student)
  upvoteSub?: Subscription;
  flagCommentSub?: Subscription;
  checkIfFlaggedSub?: Subscription;
  isAllDataLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.userService.getUser(this.comment?.UserId).subscribe(
      data => {
        this.user = data;
        if (this.user.UserType === UserType.Student) {
          this.getStudentInfo();
        } else if (this.user.UserType === UserType.Faculty) {
          this.getFacultyInfo();
        }
        this.checkIfUserFlaggedComment();
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.userInfoSub?.unsubscribe();
    this.upvoteSub?.unsubscribe();
    this.flagCommentSub?.unsubscribe();
    this.checkIfFlaggedSub?.unsubscribe();
  }

  checkIfUserFlaggedComment() {
    if (!this.authService.loggedIn()) {
      this.isFlagged = false;
      this.isAllDataLoaded = true;
    } else {
      this.checkIfFlaggedSub = this.commentService.checkIfUserFlaggedComment(this.comment?.Id).subscribe(
        data => {
          this.isFlagged = data.isFlagged;
          this.isAllDataLoaded = true;
        },
        err => console.log(err)
      );
    }
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

  getInfo() {
    let info = "";
    if (this.studentInfo) {
      info = (this.studentInfo?.Major + " Major");
    } else if (this.facultyInfo) {
      info = (this.facultyInfo?.Department + " Department");
    }
    return info;
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

  upvoteComment() {
    this.upvoteSub = this.commentService.upvoteComment(this.comment?.Id).subscribe(
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

  flagComment() {
    this.flagCommentSub = this.commentService.flagComment(this.comment).subscribe(
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
}
