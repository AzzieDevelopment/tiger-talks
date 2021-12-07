import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  _getPostBaseUrl = '/api/getpost';
  _recentPostsUrl = '/api/getRecentPosts';
  _getPostsBaseUrl = '/api/getposts'; // for tiger space posts
  _getRecentPostsUserInfoUrl = 'api/getRecentPostsUserInfo';
  _getNumCommentsBaseURL = '/api/commentcount/';
  _creatPostUrl = '/api/createPost';

  constructor(private httpClient: HttpClient) { }

  getPost(postId: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this._getPostBaseUrl}/${postId}`);
  }

  getRecentPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(this._recentPostsUrl);
  }

  getRecentPostsUserInfo(): Observable<any> {
    return this.httpClient.get<any>(this._getRecentPostsUserInfoUrl);
  }

  getTigerSpacePosts(tigerSpaceId: number): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this._getPostsBaseUrl}/${tigerSpaceId}`);
  }

  getNumberOfComments(postId: number): Observable<any> {
    return this.httpClient.get<any>(`${this._getNumCommentsBaseURL}/${postId}`);
  }

  createPost(post: IPost): Observable<any> {
    return this.httpClient.post(`${this._creatPostUrl}`, post);
  }
}
