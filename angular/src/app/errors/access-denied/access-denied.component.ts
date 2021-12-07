import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  pageTitle: string = "403 Access Denied";
  message: string = "Sorry, you do not have access to this resource!";

  constructor() { }

  ngOnInit(): void {
  }

}
