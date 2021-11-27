import { GuidelinesComponent } from './guidelines/guidelines.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TigerSpacesGridComponent } from './tigerspaces-grid/tigerspaces-grid.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { TigerSpacesGridResolverService } from './tigerspaces-grid/tigerspaces-grid-resolver.service';
import { TigerpageComponent } from './tigerpage/tigerpage.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignUpFormComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'guidelines', component: GuidelinesComponent},
  { path: 'tigerpage', component: TigerpageComponent },
  { 
    path: 'tigerspaces', 
    component: TigerSpacesGridComponent,
    resolve: { tigerspaces: TigerSpacesGridResolverService }
  },
  { path: 'tigerspaces/:id', component: PageNotFoundComponent },
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
