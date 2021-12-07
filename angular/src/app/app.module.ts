import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { TigerSpaceListComponent } from './home-page/tigerspace-list/tigerspace-list.component';
import { RecentPostsComponent } from './home-page/recent-posts/recent-posts.component';
import { TigerSpacesGridComponent } from './tigerspaces-grid/tigerspaces-grid.component';
import { TigerspaceThumbnailComponent } from './tigerspaces-grid/tigerspace-thumbnail/tigerspace-thumbnail.component';
import { ProfileDisplayComponent } from './profile-display/profile-display.component';
import { EditProfileComponent } from './profile-display/edit-profile/edit-profile.component';
import { PageNotFoundComponent } from './errors/pagenotfound/pagenotfound.component';
import { BannerComponent } from './banner/banner.component';
import { UserService } from './services/user.service';
import { LoggerService } from './services/logger.service';
import { HomePageComponent } from './home-page/home-page.component';
import { TigerSpacePageComponent } from './tigerspace-page/tigerspace-page.component';
import { ModeratorDisplayComponent } from './moderator-display/moderator-display.component';
import { FlaggedPostsComponent } from './moderator-display/flagged-posts/flagged-posts.component';
import { BannedUsersComponent } from './moderator-display/banned-users/banned-users.component';
import { GuestPostsComponent } from './moderator-display/guest-posts/guest-posts.component';
import { FlaggedCommentsComponent } from './moderator-display/flagged-comments/flagged-comments.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TigerSpaceService } from './services/tigerspace.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PostComponent } from './post/post.component';
import { PostService } from './services/post.service';
import { CommentsPageComponent } from './comments-page/comments-page.component';
import { CommentComponent } from './comments-page/comment/comment.component';
import { MakePostComponent } from './make-post/make-post.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { CreateTigerspaceComponent } from './create-tigerspace/create-tigerspace.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,  
    SignUpComponent,
    HomePageComponent,
    NavbarComponent,
    SignInComponent,
    GuidelinesComponent,
    TigerSpaceListComponent,
    RecentPostsComponent,
    TigerSpacesGridComponent,
    TigerspaceThumbnailComponent,
    ProfileDisplayComponent,
    EditProfileComponent,
    TigerSpacePageComponent,
    PageNotFoundComponent,
    BannerComponent,
    PostComponent,
    CommentsPageComponent,
    CommentComponent,
    ModeratorDisplayComponent,
    FlaggedPostsComponent,
    BannedUsersComponent,
    GuestPostsComponent,
    FlaggedCommentsComponent,
    MakePostComponent,
    AccessDeniedComponent,
    CreateTigerspaceComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthService, 
    AuthGuard,
    UserService, 
    PostService,
    TigerSpaceService,
    LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
