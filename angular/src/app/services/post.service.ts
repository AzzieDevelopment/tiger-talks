import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  _recentPostsUrl = "/api/getrecentposts";

  constructor(private httpClient: HttpClient) { }

  getRecentPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(this._recentPostsUrl);
  }
}
