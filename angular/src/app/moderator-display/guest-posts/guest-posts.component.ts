import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
) {}
}

@Component({
  selector: 'app-guest-posts',
  templateUrl: './guest-posts.component.html',
  styleUrls: ['./guest-posts.component.css']
})
export class GuestPostsComponent implements OnInit {

  post!:posts[];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    // this.getPosts();
  }

  getPosts(){
    this.httpClient.get<any>('/api/getguestposts').subscribe(
      response => {
        console.log(response);
        this.post=response;
      }
    )
  }

}
