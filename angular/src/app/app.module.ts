import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { HomePageComponent } from './home-page/home-page.component';
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
import { TigerpageComponent } from './tigerpage/tigerpage.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
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
    AppRoutingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}, 
    UserService, 
    LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
