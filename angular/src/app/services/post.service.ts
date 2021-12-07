import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPost } from '../models/post';
import { LoggerService } from './logger.service';

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
  _upvotePostBaseUrl = '/api/upvotePost';
  _flagPostUrl = '/api/flagPost';
  _checkIfUserFlaggedPostBaseUrl = '/api/didUserFlagPost';
  _editPostUrl = '/api/editPost';
  _deletePostUrl = '/api/deletePost';

  constructor(private httpClient: HttpClient, private logger: LoggerService) { }

  getPost(postId: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this._getPostBaseUrl}/${postId}`)
      .pipe(catchError(this.handleError<IPost>('getPost')));
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

  upvotePost(postId: number): Observable<any> {
    return this.httpClient.get(`${this._upvotePostBaseUrl}/${postId}`);
  }

  flagPost(post: IPost): Observable<any> {
    return this.httpClient.post(`${this._flagPostUrl}`, post);
  }

  checkIfUserFlaggedPost(postid: number): Observable<any> {
    return this.httpClient.get<any>(`${this._checkIfUserFlaggedPostBaseUrl}/${postid}`);
  }

  editPost(post: IPost): Observable<any> {
    return this.httpClient.put(`${this._editPostUrl}`, post);
  }

  deletePost(postid: number): Observable<any> {
    return this.httpClient.post(`${this._deletePostUrl}`, {postid: postid});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      return of(result as T);
    }
  }

}
