import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  pageTitle: string = "Edit Post";
  post!: IPost;
  categories: string[] = ["Academic", "Social", "Question", "Information", "Tips", "Story", "Other" ];
  editPostData: any = {
    category: ""
  };
  postSub!: Subscription;
  editPostSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {
    this.postSub = this.route.data.subscribe(
      data => {
        this.post = data.post;
        this.editPostData = {
          title: this.post.Title,
          category: this.post.Category,
          body: this.post.Body
        };
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.postSub?.unsubscribe();
    this.editPostSub?.unsubscribe();
  }

  getEditedPostData(): IPost {
    return {
      Id: this.post?.Id,
      Title: this.editPostData?.title,
      Category: this.editPostData?.category,
      Body: this.editPostData?.body,
      Upvotes: this.post?.Upvotes,
      Timestamp: this.post?.Bump,  // date created
      Bump: this.post?.Bump,       // date bumped
      UserId: this.post?.UserId,     // creator netID
      TigerSpaceId: this.post?.TigerSpaceId
    };
  }

  onSubmit() {
    let post: IPost = this.getEditedPostData();
    this.editPostSub = this.postService.editPost(post).subscribe(
      data => {
        this.router.navigate(['home']);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            this.router.navigate(['404']);
          } else if (err.status === 401) {
            this.router.navigate(['signin']);
          }
        }
      }
    );
  }

}
