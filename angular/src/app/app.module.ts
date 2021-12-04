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
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { BannerComponent } from './banner/banner.component';
import { UserService } from './services/user.service';
import { LoggerService } from './services/logger.service';
import { HomePageComponent } from './home-page/home-page.component';
import { TigerpageComponent } from './tigerpage/tigerpage.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TigerSpaceService } from './services/tigerspace.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CommentsComponent } from './comments/comments.component';

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
    TigerpageComponent,
    PageNotFoundComponent,
    BannerComponent,
    CommentsComponent,
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
    AuthService, AuthGuard,
    UserService, 
    TigerSpaceService,
    LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
