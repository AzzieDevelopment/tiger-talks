import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from '../models/comment';
import { IPost } from '../models/post';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';

@Component({
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.css']
})
export class CommentsPageComponent implements OnInit, OnDestroy {
  pageTitle: string = "Comments";
  pageDescription: string = "Be Nice!";
  post!: IPost;
  currentUserId!: string;
  loggedIn: boolean = false;
  comments?: IComment[] = [];
  newCommentData: any = {};
  routeSub: any; // subscription for route data
  commentSub: any; // subscription for comment creation

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe(
      data => {
        this.post = data.post;
        this.comments = data.comments;
      }
    );
    this.currentUserId = this.authService.getNetID();
    this.loggedIn = !!this.currentUserId;
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.commentSub?.unsubscribe();
  }

  private getCommentData(): IComment {
    return {
      Id: 0, // BE sets this up
      UserId: this.currentUserId,
      Body:this.newCommentData.body,
      PostId: this.post.Id,
      Upvotes: 0
    };
  }

  onSubmit(){
    if (!this.authService.loggedIn()) {
      // shouldn't be able to get here, but just in case
      this.router.navigate(['signin']);
    }
    let comment: IComment = this.getCommentData();
    this.commentSub = this.commentService.createComment(comment).subscribe(
      data => {
        console.log('Comment created.', data);
        window.location.reload(); // reload entire page to show new comment
      },
      error => {
        console.log('Error: ', error);
      }
    );
  }
}
