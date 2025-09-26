import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TourCatalogComponent } from './tour-catalog/tour-catalog';
import { AddTourComponent } from './add-tour/add-tour';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tour-catalog', component: TourCatalogComponent, title: "Tours - Easy Tour Choice"},
  { path: 'add-tour', component: AddTourComponent , title: "New Tour - Easy Tour Choice"},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
