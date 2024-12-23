import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TourCatalogComponent } from './tour-catalog/tour-catalog.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home - Easy Tour Choice" },
  { path: 'tour-catalog', component: TourCatalogComponent, title: "Tours - Easy Tour Choice" },
  { path: 'tour-details/:tourId', component: TourDetailsComponent, title: "Tour Details - Easy Tour Choices" },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];