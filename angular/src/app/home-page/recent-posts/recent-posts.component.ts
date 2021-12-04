import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post';

@Component({
  selector: 'recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit {

  @Input() posts: IPost[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
