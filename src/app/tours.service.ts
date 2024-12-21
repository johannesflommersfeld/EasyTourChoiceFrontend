import { Injectable } from '@angular/core';
import { Activity, ITour, Tour } from './tour-catalog/tour-preview/tour.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  tours: ITour[];

  constructor(private http: HttpClient) {
    this.tours = [];
  }

  fetchAllTours(): Observable<ITour[]> {
    return this.http.get<ITour[]>(("/api/tourData"));
  }

  fetchTourById(id: number): Observable<ITour> {
    return this.http.get<ITour>((`/api/tourData/tours/${id}`));
  }

  getFilteredTours(filters: Set<Activity>): ITour[] {
    if (this.tours.length === 0) {
      this.fetchAllTours().subscribe(tours => { this.tours = tours; });
    }
    return filters.size === 0
      ? this.tours
      : this.tours.filter((tour) => !filters.has(tour.activityType));
  }
}
