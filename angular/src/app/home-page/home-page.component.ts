import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../models/post';
import { IUser } from '../models/user';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  
  pageTitle = "Welcome to Tiger Talks!";
  recentPosts: IPost[] = [];
  subscription: any;
  
  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe(
      data => {
        this.recentPosts = data.recentPosts;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}