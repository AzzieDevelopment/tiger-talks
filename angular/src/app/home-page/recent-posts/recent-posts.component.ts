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
){
}
}

@Component({
  selector: 'recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit {

  post!:posts[];

  constructor(
    private httpClient:HttpClient
  ) { }

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
