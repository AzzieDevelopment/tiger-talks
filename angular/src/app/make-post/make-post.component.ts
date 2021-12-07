import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from '../models/post';
import { ITigerSpace } from '../models/tigerspace';
import { PostService } from '../services/post.service';

@Component({
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.css']
})
export class MakePostComponent implements OnInit, OnDestroy {
  pageTitle: string = "Make Post";
  tigerspace!: ITigerSpace;
  categories: string[] = ["Academic", "Social", "Question", "Information", "Tips", "Story", "Other" ];
  newPostData: any = {
    category: ""
  };
  routeSub!: Subscription;
  postSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe(
      data => {
        this.tigerspace = data.tigerspace;
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.postSub?.unsubscribe();
  }

  getPostData(): IPost {
    return {
      Id: 0, // BE sets this up
      Title: this.newPostData.title,
      Body: this.newPostData.body,
      Category: this.newPostData.category,
      Upvotes: 0,
      Timestamp: "",  // BE sets this up
      Bump: "",       // BE sets this up
      UserId: "", // BE sets this up
      TigerSpaceId: this.tigerspace?.Id
    }
  }

  onSubmit() {
    let post: IPost = this.getPostData();
    this.postSub = this.postService.createPost(post).subscribe(
      data => {
        console.log(data);
        this.router.navigate([".."]);
      },
      error => console.log(error)
    );
  }
}
