import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITour, Tour } from './models/tour-data/tour.model';
import { Activity } from './models/tour-data/activity.model';
import { GPSLocation } from './models/tour-data/gps-location.model';
import { AvalancheBulletin } from './models/tour-data/avalanche-bulletin.model';
import { WeatherForecast } from './models/tour-data/weather-forecast.model';
import { TravelDetails } from './models/tour-data/travel-details.model';
import * as jsonpatch from 'fast-json-patch';

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

  getFilteredTours(filters: Set<Activity>, allTours?: Tour[]): Tour[] {
    if (!allTours) {
      if (this.tours.length === 0) {
        this.fetchAllTours().subscribe(tours => { this.tours = tours; });
      }
      allTours = this.tours;
    }

    // If no filters set, return all tours
    if (filters.size === 0) {
      return allTours;
    }

    // Filter tours by activity type
    return allTours.filter((tour) => filters.has(tour.activityType));
  }

  putTour(tour: Partial<ITour>): Observable<ITour> {
    // TODO: ensure all fields are filled
    // let newTour: ITour = { ...tour, id: 0, travelDetails: null, bulletin: null, weatherForecast: null }
    return this.http.post<ITour>(`/api/tourData/`, tour);
  }

  patchTour(id: number, tourChanges: Partial<ITour>, originalTour: ITour): Observable<ITour> {
    // Create a JSON patch document by comparing original and updated tour
    const patchDocument = jsonpatch.compare(originalTour, { ...originalTour, ...tourChanges });
    console.log('Patch document:', patchDocument);

    // Send the patch document to the API
    return this.http.patch<ITour>(`/api/tourData/${id}`, patchDocument);
  }
}
