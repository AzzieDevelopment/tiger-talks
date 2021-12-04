import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IComment } from '../models/comment';

export class comments {
  constructor(
    public Id: string,
    public Major: string,
    public  Pronouns: string,
    public Timestamp: string,
    public Body: string,
    public Upvotes: number,
    public PostId: number

  ) {}
}

export class posts {
  constructor(
    public Id: string,
    public UserId: string,
    public Major: string,
    public Pronouns: string,
    public Timestamp: string,
    public Body: string,
    public Upvotes: number,
    public PostId: number,
    public Title: string
  ) {}
}

@Component({
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  pageTitle: string = "Comments";
  pageDescription: string = "Be Nice!";
  commentData:any = {};
  comment!:comments[];
  post!:posts[];
  id=this.route.snapshot.paramMap.get('postId');

  constructor(private route: ActivatedRoute,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getComments(this.id);
    this.getOriginalPost(this.id);
  }

  onSubmit(){
    let comment: IComment=this.getCommentData();
    console.log(comment);
    this.httpClient.post<any>('/api/createComment/',comment).subscribe(
    )
    
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

  private getCommentData(): IComment {
    return {
      Body:this.commentData.body,
      PostId: Number(this.id)
    };
  }

}
