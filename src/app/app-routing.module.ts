import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import {HomeComponent} from './Home/home/home.component';
import {LoginComponent} from './View/login/login.component';
import {AboutComponent} from './View/Home/about/about.component';

import {BooksComponent} from './View/Home/books/books.component';

import {AuthorsComponent} from './View/Home/authors/authors.component';

import {AdminComponent} from './View/admin/admin.component';

import { ErrorComponent } from './View/error/error.component';
// Pages End


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: {depth: 0} }, // default
  { path: 'home', component: HomeComponent, data: {depth: 1}},
  { path: 'about', component: AboutComponent, data: {depth: 1}},
  { path: 'login', component: LoginComponent, data: {depth: 2}},

  { path: 'books', component: BooksComponent, data: {depth: 5}},
  
  { path: 'authors', component: AuthorsComponent, data: {depth: 4}},

  { path: 'admin', component: AdminComponent, data: {depth: 4}},

  // { path: 'restaurant/:restaurant', component: RestaurantComponent, data: {depth: 2}}, 
  // ------
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full' } // Redirect unknown paths to the error page
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
