import { GuidelinesComponent } from './guidelines/guidelines.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TigerSpacesGridComponent } from './tigerspaces-grid/tigerspaces-grid.component';
import { ProfileDisplayComponent } from './profile-display/profile-display.component';
import { EditProfileComponent } from './profile-display/edit-profile/edit-profile.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { TigerSpacesGridResolverService } from './tigerspaces-grid/tigerspaces-grid-resolver.service';
import { TigerpageComponent } from './tigerpage/tigerpage.component';
import { ModeratorDisplayComponent } from './moderator-display/moderator-display.component';
import { FlaggedPostsComponent } from './moderator-display/flagged-posts/flagged-posts.component';
import { FlaggedCommentsComponent } from './moderator-display/flagged-comments/flagged-comments.component';
import { BannedUsersComponent } from './moderator-display/banned-users/banned-users.component';
import { GuestPostsComponent } from './moderator-display/guest-posts/guest-posts.component';
import { AuthGuard } from './guards/auth.guard';
import { CommentsComponent } from './comments/comments.component'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'guidelines', component: GuidelinesComponent },
  { path: 'comment/:postId',component:CommentsComponent },
  { path: 'tigerpage', component: TigerpageComponent },
  { 
    path: 'tigerspaces', 
    component: TigerSpacesGridComponent,
    canActivate: [AuthGuard], // TODO: remove
    resolve: { tigerspaces: TigerSpacesGridResolverService }
  },
  { path: 'tigerspaces/:id', component: PageNotFoundComponent },
  { path: 'banned-users', component: BannedUsersComponent },
  { path: 'flagged-posts', component: FlaggedPostsComponent },
  { path: 'flagged-comments', component: FlaggedCommentsComponent },
  { path: 'guest-posts', component: GuestPostsComponent },
  { path: 'moderator', component: ModeratorDisplayComponent },
  { path: 'profile', component: ProfileDisplayComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: 'tigerspaces', component: TigerSpacesGridComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
