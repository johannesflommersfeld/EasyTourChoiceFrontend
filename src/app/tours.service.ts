import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from './tour-catalog/tour-preview/tour-data/tour.model';
import { Activity } from './tour-catalog/tour-preview/tour-data/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  tours: Tour[];
  detailedTour: Tour | null;

  constructor(private http: HttpClient) {
    this.tours = [];
    this.detailedTour = null;
  }

  fetchAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(("/api/tourData"));
  }

  fetchTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>((`/api/tourData/tours/${id}`));
  }

  getFilteredTours(filters: Set<Activity>): Tour[] {
    if (this.tours.length === 0) {
      this.fetchAllTours().subscribe(tours => { this.tours = tours; });
    }
    return this.tours.filter((tour) => filters.has(tour.activityType));
  }

  getTourById(id: number): Tour | null {
    this.fetchTourById(id).subscribe(tour => {
      this.detailedTour = tour;
    });
    return this.detailedTour;
  }
}
