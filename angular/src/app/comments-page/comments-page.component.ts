import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from '../models/comment';
import { IPost } from '../models/post';

@Component({
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.css']
})
export class CommentsPageComponent implements OnInit, OnDestroy {
  pageTitle: string = "Comments";
  pageDescription: string = "Be Nice!";
  post!: IPost;
  comments?: IComment[] = [{
    Id: 1,
    UserId: 'shallc1',
    PostId: 1,
    Timestamp: '2021-12-03 23:38:47',
    Body: 'Test comment',
    Upvotes: 0
  }];
  subscription: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(
      data => {
        this.post = data.post;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(){
    // let comment: IComment=this.getCommentData();
    // console.log(comment);
    // this.httpClient.post<any>('/api/createComment/',comment).subscribe(
    // )
  }
}
