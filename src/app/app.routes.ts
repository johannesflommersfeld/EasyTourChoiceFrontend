import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TourCatalogComponent } from './tour-catalog/tour-catalog';
import { TourFormComponent } from './tour-form/tour-form';
import { TourDetailsComponent } from './tour-details/tour-details';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tour-catalog', component: TourCatalogComponent, title: "Tours - Easy Tour Choice"},
  { path: 'tour-details/:tourId', component: TourDetailsComponent, title: "Tour Details - Easy Tour Choices" },
  { path: 'add-tour', component: TourFormComponent , title: "New Tour - Easy Tour Choice"},
  { path: 'edit-tour/:tourId', component: TourFormComponent , title: "EditTour Tour - Easy Tour Choice"},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
