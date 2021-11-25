import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.css']
})
export class GuidelinesComponent implements OnInit {

  pageTitle:string = "Community Guidelines";
  
  constructor() { }

  ngOnInit(): void {
  }

}
