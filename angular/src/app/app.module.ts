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
<<<<<<< HEAD
import { TigerpageComponent } from './tigerpage/tigerpage.component';
=======
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TigerSpaceService } from './services/tigerspace.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
>>>>>>> 3b7ae134614909e82c160cd23a69006db0c3c3e0

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
