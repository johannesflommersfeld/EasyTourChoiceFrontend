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
import { Filters } from './tour-catalog/tour-catalog.component';
import { GeneralDifficulty } from './models/tour-data/general-difficulty.model';
import { RiskLevel } from './models/tour-data/risk-level.model';
import { Aspect } from './models/tour-data/aspect.model';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  tours: Tour[];

  constructor(private http: HttpClient) {
    this.tours = [];
  }

  fetchAllTours(location: GPSLocation | null): Observable<Tour[]> {
    let params = new HttpParams();
    if (location !== null) {
      params = params.append('userLatitude', location.latitude);
      params = params.append('userLongitude', location.longitude);
    }
    return this.http.get<Tour[]>(("/api/tourData"), { params });
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

  getFilteredTours(location: GPSLocation | null, filters: Filters, allTours?: Tour[]): Tour[] {
    if (!allTours) {
      if (this.tours.length === 0) {
        this.fetchAllTours(location).subscribe(tours => { this.tours = tours; });
      }
      allTours = this.tours;
    }

    return allTours.filter((tour) => {
      let included: boolean = true;
      if (filters.activitiesFlag !== undefined && filters.activitiesFlag !== Activity.UNDEFINED) {
        included &&= (tour.activityType & filters.activitiesFlag) !== 0;
      }
      if (filters.minDistance !== undefined && filters.maxDistance !== undefined && tour.distance !== null) {
        included &&= tour.distance >= filters.minDistance;
        included &&= tour.distance <= filters.maxDistance;
      }
      if (filters.minDuration !== undefined && filters.maxDuration !== undefined && tour.duration !== null) {
        included &&= tour.duration >= filters.minDuration;
        included &&= tour.duration <= filters.maxDuration;
      }
      if (filters.minMetersOfElevation !== undefined && filters.maxMetersOfElevation !== undefined &&
        tour.metersOfElevation !== null) {
        included &&= tour.metersOfElevation >= filters.minMetersOfElevation;
        included &&= tour.metersOfElevation <= filters.maxMetersOfElevation;
      }
      if (filters.minDifficulty !== undefined && filters.maxDifficulty !== undefined && tour.difficulty !== null && tour.difficulty !== GeneralDifficulty.UNKNOWN) {
        included &&= tour.difficulty >= filters.minDifficulty;
        included &&= tour.difficulty <= filters.maxDifficulty;
      }
      if (filters.minRisk !== undefined && filters.maxRisk !== undefined && tour.risk !== null && tour.risk !== RiskLevel.UNKNOWN) {
        included &&= tour.risk >= filters.minRisk;
        included &&= tour.risk <= filters.maxRisk;
      }
      if (filters.minTravelDistance !== undefined && filters.maxTravelDistance !== undefined &&
        tour.travelDetails?.travelDistance !== undefined && tour.travelDetails?.travelDistance !== null) {
        included &&= tour.travelDetails?.travelDistance >= filters.minTravelDistance;
        included &&= tour.travelDetails?.travelDistance <= filters.maxTravelDistance;
      }
      if (filters.minTravelDuration !== undefined && filters.maxTravelDuration !== undefined &&
        tour.travelDetails?.travelTime !== undefined && tour.travelDetails?.travelTime !== null) {
        included &&= tour.travelDetails?.travelTime >= filters.minTravelDuration;
        included &&= tour.travelDetails?.travelTime <= filters.maxTravelDuration;
      }
      if (filters.aspects !== undefined && tour.aspect !== null && tour.aspect !== Aspect.UNKNOWN) {
        included &&= (tour.aspect & filters.aspects) !== 0;
      }
      return included;
    });
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

  deleteTour(id: number) {
    console.log('Delete tour:', id);
    return this.http.delete(`/api/tourData/${id}`);
  }

}
