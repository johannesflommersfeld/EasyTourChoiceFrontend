import { Injectable, Signal } from "@angular/core";
import { GPSLocation } from "../../lib/domain/tour-data/gps-location";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { TravelDetails } from "../../lib/domain/tour-data/travel-details";

@Injectable({
  providedIn: 'root'
})
export class TravelInfoService {
  createTravelInfoResourceById(id: Signal<string | undefined>, location: Signal<GPSLocation | undefined>): HttpResourceRef<TravelDetails | undefined> {
    return httpResource(() => {
      if (!location()) return undefined;

      return {
        url: `/api/tourData/tours/${id()}/travelInfo`,
        method: 'GET',
        params: {
          'userLatitude': location()?.latitude ?? '',
          'userLongitude': location()?.longitude ?? '',
        },
        reportProgress: true,
      }
    });
  }
}