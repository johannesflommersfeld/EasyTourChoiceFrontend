import { computed, Injectable, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Tour } from '../../lib/domain/tour-data/tour';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';
import { Aspect } from '../../lib/domain/tour-data/aspect';
import { RiskLevel } from '../../lib/domain/tour-data/risk-level';
import { GeneralDifficulty } from '../../lib/domain/tour-data/general-difficulty';
import { SortingCriterium } from '../../lib/ui/sorting-criterium';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  // readonly usersResource = httpResource<Tour[]>(() => `/api/tourData`);

  createToursResource(filter: Signal<FilterValues | undefined>, sortOption: Signal<string | undefined>, sortOptionsMap?: Record<string, SortingCriterium>) {
    const toursResource = httpResource<Tour[]>(() => '/api/tourData');

    return computed(() => {
      let tours = toursResource.value();
      const filterValues = filter();
      const sortOptionValue = sortOption() ? sortOption() : "Distance";
      const sortingCriterium = sortOptionsMap ? sortOptionsMap[sortOptionValue as keyof typeof sortOptionsMap] : SortingCriterium.DISTANCE;

      if (!tours) return tours;

      if (filterValues !== undefined) {
        tours = tours.filter(tour => {
          if (tour.distance !== null &&
              (tour.distance < filterValues.distance.min || tour.distance > filterValues.distance.max)) {
            return false;
          }

          if (tour.duration !== null &&
              (tour.duration < filterValues.duration.min || tour.duration > filterValues.duration.max)) {
            return false;
          }

          if (tour.metersOfElevation !== null &&
              (tour.metersOfElevation < filterValues.elevation.min || tour.metersOfElevation > filterValues.elevation.max)) {
            return false;
          }

          if (tour.difficulty !== null && tour.difficulty !== GeneralDifficulty.UNKNOWN &&
              (tour.difficulty < filterValues.difficulty.min || tour.difficulty > filterValues.difficulty.max)) {
            return false;
          }

          if (tour.risk !== null && tour.risk !== RiskLevel.UNKNOWN &&
              (tour.risk < filterValues.risk.min || tour.risk > filterValues.risk.max)) {
            return false;
          }

          if (filterValues.aspects !== Aspect.UNKNOWN && tour.aspect !== null && tour.aspect !== Aspect.UNKNOWN) {
            if ((tour.aspect & filterValues.aspects) === 0) {
              return false;
            }
          }

          if (tour.travelDetails?.travelDistance !== undefined && tour.travelDetails?.travelDistance !== null &&
              (tour.travelDetails.travelDistance < filterValues.travelDistance.min ||
              tour.travelDetails.travelDistance > filterValues.travelDistance.max)) {
            return false;
          }

          if (tour.travelDetails?.travelTime !== undefined && tour.travelDetails?.travelTime !== null &&
              (tour.travelDetails.travelTime < filterValues.travelDuration.min ||
              tour.travelDetails.travelTime > filterValues.travelDuration.max)) {
            return false;
          }

          return true;
        });
      }

      return tours.sort((a, b) => {
        switch (sortingCriterium) {
          case SortingCriterium.DISTANCE:
            return (a.distance || 0) - (b.distance || 0);
          case SortingCriterium.DURATION:
            return (a.duration || 0) - (b.duration || 0);
          case SortingCriterium.METER_OF_ELEVATION:
            return (a.metersOfElevation || 0) - (b.metersOfElevation || 0);
          case SortingCriterium.DIFFICULTY:
            return (a.difficulty || 0) - (b.difficulty || 0);
          case SortingCriterium.RISK:
            return (a.risk || 0) - (b.risk || 0);
          case SortingCriterium.TRAVEL_DISTANCE:
            return (a.travelDetails?.travelDistance || 0) - (b.travelDetails?.travelDistance || 0);
          case SortingCriterium.TRAVEL_DURATION:
            return (a.travelDetails?.travelTime || 0) - (b.travelDetails?.travelTime || 0);
          default:
            return 0;
          }
      });
    });
  }


  createSingleTourResource(tourId: Signal<string>) {
    return httpResource<Tour>(() => `/api/tourData/${tourId()}`);
  }


  // fetchWeatherForecastById(id: number): Observable<WeatherForecast> {
  //   return this.http.get<WeatherForecast>((`/api/tourData/tours/${id}/weatherForecast`));
  // }

  // fetchAvalancheReportById(id: number): Observable<AvalancheBulletin> {
  //   return this.http.get<AvalancheBulletin>((`/api/tourData/tours/${id}/avalancheReport`));
  // }

  // fetchTravelInfoById(id: number, location: GPSLocation): Observable<TravelDetails> {
  //   let params = new HttpParams();
  //   params = params.append('userLatitude', location.latitude);
  //   params = params.append('userLongitude', location.longitude);
  //   return this.http.get<TravelDetails>((`/api/tourData/tours/${id}/travelInfo`), { params });
  // }

  // getFilteredTours(location: GPSLocation | null, filters: Filters, allTours?: Tour[]): Tour[] {
  //   if (!allTours) {
  //     if (this.tours.length === 0) {
  //       this.fetchAllTours(location).subscribe(tours => { this.tours = tours; });
  //     }
  //     allTours = this.tours;
  //   }

  //   return allTours.filter((tour) => {
  //     let included: boolean = true;
  //     if (filters.activitiesFlag !== undefined && filters.activitiesFlag !== Activity.UNDEFINED) {
  //       included &&= (tour.activityType & filters.activitiesFlag) !== 0;
  //     }
  //     if (filters.minDistance !== undefined && filters.maxDistance !== undefined && tour.distance !== null) {
  //       included &&= tour.distance >= filters.minDistance;
  //       included &&= tour.distance <= filters.maxDistance;
  //     }
  //     if (filters.minDuration !== undefined && filters.maxDuration !== undefined && tour.duration !== null) {
  //       included &&= tour.duration >= filters.minDuration;
  //       included &&= tour.duration <= filters.maxDuration;
  //     }
  //     if (filters.minMetersOfElevation !== undefined && filters.maxMetersOfElevation !== undefined &&
  //       tour.metersOfElevation !== null) {
  //       included &&= tour.metersOfElevation >= filters.minMetersOfElevation;
  //       included &&= tour.metersOfElevation <= filters.maxMetersOfElevation;
  //     }
  //     if (filters.minDifficulty !== undefined && filters.maxDifficulty !== undefined && tour.difficulty !== null && tour.difficulty !== GeneralDifficulty.UNKNOWN) {
  //       included &&= tour.difficulty >= filters.minDifficulty;
  //       included &&= tour.difficulty <= filters.maxDifficulty;
  //     }
  //     if (filters.minRisk !== undefined && filters.maxRisk !== undefined && tour.risk !== null && tour.risk !== RiskLevel.UNKNOWN) {
  //       included &&= tour.risk >= filters.minRisk;
  //       included &&= tour.risk <= filters.maxRisk;
  //     }
  //     if (filters.minTravelDistance !== undefined && filters.maxTravelDistance !== undefined &&
  //       tour.travelDetails?.travelDistance !== undefined && tour.travelDetails?.travelDistance !== null) {
  //       included &&= tour.travelDetails?.travelDistance >= filters.minTravelDistance;
  //       included &&= tour.travelDetails?.travelDistance <= filters.maxTravelDistance;
  //     }
  //     if (filters.minTravelDuration !== undefined && filters.maxTravelDuration !== undefined &&
  //       tour.travelDetails?.travelTime !== undefined && tour.travelDetails?.travelTime !== null) {
  //       included &&= tour.travelDetails?.travelTime >= filters.minTravelDuration;
  //       included &&= tour.travelDetails?.travelTime <= filters.maxTravelDuration;
  //     }
  //     if (filters.aspects !== undefined && tour.aspect !== null && tour.aspect !== Aspect.UNKNOWN) {
  //       included &&= (tour.aspect & filters.aspects) !== 0;
  //     }
  //     return included;
  //   });
  // }

  // putTour(tour: Partial<ITour>): Observable<ITour> {
  //   // TODO: ensure all fields are filled
  //   // let newTour: ITour = { ...tour, id: 0, travelDetails: null, bulletin: null, weatherForecast: null }
  //   return this.http.post<ITour>(`/api/tourData/`, tour);
  // }

  // patchTour(id: number, tourChanges: Partial<ITour>, originalTour: ITour): Observable<ITour> {
  //   // Create a JSON patch document by comparing original and updated tour
  //   const patchDocument = jsonpatch.compare(originalTour, { ...originalTour, ...tourChanges });
  //   console.log('Patch document:', patchDocument);

  //   // Send the patch document to the API
  //   return this.http.patch<ITour>(`/api/tourData/${id}`, patchDocument);
  // }

  // deleteTour(id: number) {
  //   console.log('Delete tour:', id);
  //   return this.http.delete(`/api/tourData/${id}`);
  // }

}