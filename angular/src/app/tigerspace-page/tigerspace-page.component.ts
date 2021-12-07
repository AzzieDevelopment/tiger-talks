import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../models/post';
import { ITigerSpace } from '../models/tigerspace';

@Component({
  templateUrl: './tigerspace-page.component.html',
  styleUrls: ['./tigerspace-page.component.css']
})
export class TigerSpacePageComponent implements OnInit, OnDestroy {
  pageTitle = "Tiger Space Name Goes Here!";
  tigerspace!: ITigerSpace;
  subscription: any;
  posts: IPost[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(
      data => {
        this.tigerspace = data.tigerspace;
        this.posts = data.posts;
        this.pageTitle = this.tigerspace?.Title;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
