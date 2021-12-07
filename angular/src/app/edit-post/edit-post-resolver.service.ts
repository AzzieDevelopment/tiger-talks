import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../models/post';
import { PostService } from '../services/post.service';

@Injectable({
  providedIn: 'root'
})
export class EditPostResolverService implements Resolve<IPost> {

  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IPost | Observable<IPost> | Promise<IPost> {
    return this.postService.getPost(route.params.postId);
  }
}
