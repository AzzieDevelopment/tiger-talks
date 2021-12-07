import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _getPostCommentsBaseUrl = '/api/getpostcomments';
  private _createCommentUrl = '/api/createComment';
  private _upvoteCommentBaseUrl = '/api/upvoteComment';
  private _flagCommentUrl = '/api/flagComment';
  private _checkIfUserFlaggedCommentBaseUrl = '/api/didUserFlagComment';

  constructor(private httpClient: HttpClient) { }

  // get comments for a specific post
  getPostComments(postId: number): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(`${this._getPostCommentsBaseUrl}/${postId}`);
  }

  // create comment
  createComment(comment: IComment) {
    return this.httpClient.post<any>(this._createCommentUrl, comment);
  }

  // upvote comment
  upvoteComment(commentId: number): Observable<any> {
    return this.httpClient.get<any>(`${this._upvoteCommentBaseUrl}/${commentId}`);
  }

  flagComment(comment: IComment): Observable<any> {
    return this.httpClient.post<any>(`${this._flagCommentUrl}`, comment);
  }

  checkIfUserFlaggedComment(commentid: number): Observable<any> {
    return this.httpClient.get<any>(`${this._checkIfUserFlaggedCommentBaseUrl}/${commentid}`);
  }
}
