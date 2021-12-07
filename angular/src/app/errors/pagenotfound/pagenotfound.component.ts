import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PageNotFoundComponent implements OnInit {

  pageTitle: string = "404 Page Not Found";
  message: string = "Sorry, we could not find what you were looking for!";

  constructor() { }

  ngOnInit(): void {
  }

}
