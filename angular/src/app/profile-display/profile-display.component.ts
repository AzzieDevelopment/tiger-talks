import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export class profile{
  constructor(
    public Id: string,
    public FirstName: string,
    public LastName: string,
    public UserType: number,
    public Major: string,
    public Pronouns: string,
    public PName: string,
    public Bio: string,
  ){};
}

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient:HttpClient) { }

  prof!: profile;
  id=this.route.snapshot.paramMap.get('userId');

  ngOnInit(): void {
    this.getProfile(this.id);

  }

  getProfile(userId:any){
    this.httpClient.get<any>(`/api/getuser/${userId}`).subscribe(
      response => {
        console.log(response);
        this.prof=response;
      }
    )
  }

}
