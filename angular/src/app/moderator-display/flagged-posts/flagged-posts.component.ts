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
  selector: 'app-flagged-posts',
  templateUrl: './flagged-posts.component.html',
  styleUrls: ['./flagged-posts.component.css']
})
export class FlaggedPostsComponent implements OnInit {

  post!:posts[];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    // this.getPosts();
  }

  getPosts(){
    this.httpClient.get<any>('/api/getflaggedposts').subscribe(
      response => {
        console.log(response);
        this.post=response;
      }
    )
  }

}
