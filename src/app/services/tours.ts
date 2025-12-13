import { computed, inject, Injectable, Signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { ITour, toTourForm } from '../../lib/domain/tour-data/tour';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';
import { Aspect } from '../../lib/domain/tour-data/aspect';
import { RiskLevel } from '../../lib/domain/tour-data/risk-level';
import { GeneralDifficulty } from '../../lib/domain/tour-data/general-difficulty';
import { SortingCriterium } from '../../lib/ui/sorting-criterium';
import { Activity } from '../../lib/domain/tour-data/activity';
import { WeatherForecast } from '../../lib/domain/tour-data/weather-forecast';
import { AvalancheBulletin } from '../../lib/domain/tour-data/avalanche-bulletin';
import * as jsonpatch from 'fast-json-patch';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private readonly http = inject(HttpClient)

  createToursResource(
    filter: Signal<FilterValues | undefined>,
    sortOption: Signal<string | undefined>,
    activities: Signal<Activity[] | undefined>,
    sortOptionsMap?: Record<string, SortingCriterium>
  ) {
    const toursResource = httpResource<ITour[]>(() => '/api/tourData');

    return computed(() => {
      if (!toursResource.hasValue()) {
        return undefined;
      }

      let tours = toursResource.value();
      tours.forEach(tour => tour.toTourForm = toTourForm)
      const filterValues = filter();
      const sortOptionValue = sortOption() ? sortOption() : "Distance";
      const activityValues = activities() ? activities() : [Activity.UNDEFINED];
      const sortingCriterium = sortOptionsMap
        ? sortOptionsMap[sortOptionValue as keyof typeof sortOptionsMap]
        : SortingCriterium.DISTANCE;

      if (!tours) return tours;

      if (activityValues && activityValues.length > 0 && !activityValues.includes(Activity.UNDEFINED)) {
        tours = tours.filter(tour => {
          return activityValues.includes(tour.activityType);
        })
      }

      if (filterValues !== undefined) {
        tours = tours.filter(tour => {
          if (tour.distance &&
              (tour.distance < filterValues.distance.min || tour.distance > filterValues.distance.max)) {
            return false;
          }

          if (tour.duration&&
              (tour.duration < filterValues.duration.min || tour.duration > filterValues.duration.max)) {
            return false;
          }

          if (tour.metersOfElevation &&
              (tour.metersOfElevation < filterValues.elevation.min || tour.metersOfElevation > filterValues.elevation.max)) {
            return false;
          }

          if (tour.difficulty !== null && tour.difficulty !== undefined && tour.difficulty !== GeneralDifficulty.UNKNOWN &&
              (tour.difficulty < filterValues.difficulty.min || tour.difficulty > filterValues.difficulty.max)) {
            return false;
          }

          if (tour.risk !== null && tour.risk !== undefined && tour.risk !== RiskLevel.UNKNOWN &&
              (tour.risk < filterValues.risk.min || tour.risk > filterValues.risk.max)) {
            return false;
          }

          if (filterValues.aspects !== Aspect.UNKNOWN && tour.aspect !== null && tour.aspect !== undefined && tour.aspect !== Aspect.UNKNOWN) {
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

  createSingleTourResource = (tourId: Signal<number | undefined>) => httpResource<ITour>(() => tourId() ? `/api/tourData/tours/${tourId()}` : undefined);
  createWeatherForecastResourceById = (tourId: Signal<number | undefined>) => httpResource<WeatherForecast>(() => `/api/tourData/tours/${tourId()}/weatherForecast`);
  createAvalancheReportResourceById = (tourId: Signal<number | undefined>) => httpResource<AvalancheBulletin>(() => `/api/tourData/tours/${tourId()}/avalancheReport`);

  putTour(tour: Partial<ITour>): Observable<ITour> {
    // TODO: ensure all fields are filled
    // let newTour: ITour = { ...tour, id: 0, travelDetails: null, bulletin: null, weatherForecast: null }
    return this.http.post<ITour>(`/api/tourData/`, tour);
  }

  patchTour(id: number, tourChanges: Partial<ITour>, originalTour: ITour): Observable<ITour> {
    console.log('patch');
    console.log({ ...originalTour, ...tourChanges });
    const patchDocument = jsonpatch.compare(originalTour, { ...originalTour, ...tourChanges });
    console.log(patchDocument);
    return this.http.patch<ITour>(`/api/tourData/${id}`, patchDocument);
  }

  deleteTour(id: number) {
    return this.http.delete(`/api/tourData/${id}`);
  }
}