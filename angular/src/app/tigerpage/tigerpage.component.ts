import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class tigerInfo {
  constructor(
    public Id: number, // post id 
    public Title: string, // of tiger space 
    public Description: string, // of tiger space
    public TigerId: number,
    public Body: string,
    public Category: string,
    public Upvotes: number,
    public Timestamp: string, // The backend should reformat this to look presentable
    public UserId: string,
    public TigerSpaceId: number,
    public Pronouns: string,
    public Major : string,
    public PostTitle : string, //(for tiger spaces)
    public Comments: number //(amount of comments)
  ) {}
}

@Component({
  selector: 'app-tigerpage',
  templateUrl: './tigerpage.component.html',
  styleUrls: ['./tigerpage.component.css']
})
export class TigerpageComponent implements OnInit {
  tigerInfo!:tigerInfo[];
  pageTitle = "Tiger Space Name Goes Here!";

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    //this.getTigerInfo();
  }
  // getTigerInfo(){
  //   this.httpClient.get<any>('/api/endpointfortigerspacepage').subscribe(
  //     response => {
  //       console.log(response);
  //       this.tigerInfo=response;
  //     }
  //   )
  // }
}
