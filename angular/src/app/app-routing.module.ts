import { GuidelinesComponent } from './guidelines/guidelines.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TigerSpacesGridComponent } from './tigerspaces-grid/tigerspaces-grid.component';
import { PageNotFoundComponent } from './errors/pagenotfound/pagenotfound.component';
import { TigerSpacesGridResolverService } from './tigerspaces-grid/tigerspaces-grid-resolver.service';
import { TigerSpacePageComponent } from './tigerspace-page/tigerspace-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RecentPostsResolverService } from './home-page/recent-posts/recent-posts-resolver.service';
import { TigerSpaceResolverService } from './tigerspace-page/tigerspace-page-resolver.service';
import { TigerspacePostsResolverService } from './tigerspace-page/tigerspace-posts-resolver.service';
import { CommentsPageComponent } from './comments-page/comments-page.component';
import { CommentsPagePostResolverService } from './comments-page/comments-page-post-resolver.service';
import { CommentsPageCommentsResolverService } from './comments-page/comments-page-comments-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', component: HomePageComponent,
    resolve: { recentPosts: RecentPostsResolverService } 
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'guidelines', component: GuidelinesComponent },
  { path: 'comments/:postId', component: CommentsPageComponent,
    resolve: { 
      post: CommentsPagePostResolverService,
      comments: CommentsPageCommentsResolverService
    }
  },
  { path: 'guidelines', component: GuidelinesComponent},
  { 
    path: 'tigerspaces', 
    component: TigerSpacesGridComponent,
    canActivate: [AuthGuard], // TODO: remove
    resolve: { tigerspaces: TigerSpacesGridResolverService }
  },
  { 
    path: 'tigerspace/:id', 
    component: TigerSpacePageComponent,
    resolve: { 
      tigerspace: TigerSpaceResolverService,
      posts: TigerspacePostsResolverService
     }
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
