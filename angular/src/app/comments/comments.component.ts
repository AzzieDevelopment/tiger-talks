import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export class comments {
  constructor(
    public Id: string,
    public Major: string,
    public  Pronouns: string,
    public Timestamp: string,
    public Body: string,
    public Upvotes: number,
    public PostId: number

  )
  {}
}

export class posts {
  constructor(
    public Id: string,
    public UserId: string,
    public Major: string,
    public  Pronouns: string,
    public Timestamp: string,
    public Body: string,
    public Upvotes: number,
    public PostId: number,
    public Title: string

  )
  {}
}


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  constructor(private route: ActivatedRoute,private httpClient:HttpClient) { }
  
  comment!:comments[];
  post!:posts[];
  ngOnInit(): void {
    

    let id=this.route.snapshot.paramMap.get('postId');
    this.getComments(id);
    this.getOriginalPost(id);


  }

  getComments(postId:any){
    this.httpClient.get<any>(`/api/getcommentdata/${postId}`).subscribe(
      response => {
        console.log(response);
        this.comment=response;
      }
    )
  }

  getOriginalPost(postId:any){
    this.httpClient.get<any>(`/api/getpostdata/${postId}`).subscribe(
      response => {
        console.log(response);
        this.post=response;
      }
    )
  }

}
