import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from './tour-catalog/tour-preview/tour-data/tour.model';
import { Activity } from './tour-catalog/tour-preview/tour-data/activity.model';
import { GPSLocation } from './tour-catalog/tour-preview/tour-data/gps-location.model';

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

  fetchTourById(id: number, location: GPSLocation): Observable<Tour> {
    if (location == null) {
      return this.http.get<Tour>((`/api/tourData/tours/${id}`));
    }
    let params = new HttpParams();
    params = params.append('userLatitude', location.latitude);
    params = params.append('userLongitude', location.longitude);
    return this.http.get<Tour>((`/api/tourData/tours/${id}`), { params });
  }

  getFilteredTours(filters: Set<Activity>): Tour[] {
    if (this.tours.length === 0) {
      this.fetchAllTours().subscribe(tours => { this.tours = tours; });
    }
    return this.tours.filter((tour) => filters.has(tour.activityType));
  }
}
