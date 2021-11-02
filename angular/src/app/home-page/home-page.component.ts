import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  message: string = "default message...";
  
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getHello().subscribe(
      response => {
        this.message = response.message;
      },
      error => {
        console.log(error);
        alert("Error: could not get message from backend.");
      }
    );
  }

}