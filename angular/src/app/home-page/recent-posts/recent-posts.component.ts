import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class posts {
  constructor(
    public Id: number,
    public Title: string,
    public Body: string,
    public Category: string,
    public Upvotes: number,
    public Timestamp: string,
    public UserId: string,
    public TigerSpaceId: number
)
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
// )
{
}
}

@Component({
  selector: 'recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit {

  post!:posts[];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.httpClient.get<any>('/api/getrecentposts').subscribe(
      response => {
        console.log(response);
        this.post=response;
      }
    )
  }

}
