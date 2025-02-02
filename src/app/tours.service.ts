import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from './models/tour-data/tour.model';
import { Activity } from './models/tour-data/activity.model';
import { GPSLocation } from './models/tour-data/gps-location.model';
import { AvalancheBulletin } from './models/tour-data/avalanche-bulletin.model';
import { WeatherForecast } from './models/tour-data/weather-forecast.model';
import { TravelDetails } from './models/tour-data/travel-details.model';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  tours: Tour[];

  constructor(private http: HttpClient) {
    this.tours = [];
  }

  fetchAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(("/api/tourData"));
  }

  fetchTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>((`/api/tourData/tours/${id}`));
  }

  fetchWeatherForecastById(id: number): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>((`/api/tourData/tours/${id}/weatherForecast`));
  }

  fetchAvalancheReportById(id: number): Observable<AvalancheBulletin> {
    return this.http.get<AvalancheBulletin>((`/api/tourData/tours/${id}/avalancheReport`));
  }

  fetchTravelInfoById(id: number, location: GPSLocation): Observable<TravelDetails> {
    let params = new HttpParams();
    params = params.append('userLatitude', location.latitude);
    params = params.append('userLongitude', location.longitude);
    return this.http.get<TravelDetails>((`/api/tourData/tours/${id}/travelInfo`), { params });
  }

  getFilteredTours(filters: Set<Activity>): Tour[] {
    if (this.tours.length === 0) {
      this.fetchAllTours().subscribe(tours => { this.tours = tours; });
    }
    return this.tours.filter((tour) => filters.has(tour.activityType));
  }
}
