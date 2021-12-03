import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

// In preparation for backend changes
// constructor(
//   public Id: number,
//   public Title: string, //(for post)
//   public Body: string,
//   public Category: string,
//   public Upvotes: number,
//   public Timestamp: string, // The backend should reformat this to look presentable
//   public UserId: string,
//   public TigerSpaceId: number,
//   public Pronouns: string,
//   public Major : string
//   public Title : string //(for tiger spaces)
//   public Comments: number //(amount of comments)
//
// ) {}
//}

@Component({
  selector: 'recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  subscription: any;

  constructor(
    private router:Router, 
    private postService: PostService) { }

  commentRedirect(postId: any){
    this.router.navigate([`comment/${postId}`]);
  }

  ngOnInit(): void {
    this.subscription = this.postService.getRecentPosts().subscribe(
      res => this.posts = res,
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
