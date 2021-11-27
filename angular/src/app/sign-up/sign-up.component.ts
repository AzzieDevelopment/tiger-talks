import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  pageTitle: string = "Sign Up";
  signUpUserData = {}
  
  constructor() { }

  ngOnInit(): void {
  }

}
