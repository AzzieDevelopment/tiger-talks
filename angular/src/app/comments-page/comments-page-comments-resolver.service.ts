import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IComment } from '../models/comment';
import { CommentService } from '../services/comment.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsPageCommentsResolverService implements Resolve<IComment[]> {

  constructor(private commentService: CommentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IComment[] | Observable<IComment[]> | Promise<IComment[]> {
    return this.commentService.getPostComments(route.params.postId);
  }
}
