import { Injectable, Signal } from "@angular/core";
import { GPSLocation } from "../../lib/domain/tour-data/gps-location";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { TravelDetails } from "../../lib/domain/tour-data/travel-details";

@Injectable({
  providedIn: 'root'
})
export class TravelInfoService {

  fetchTravelInfoById(id: Signal<number>, location: GPSLocation): HttpResourceRef<TravelDetails | undefined> {
    return httpResource(() => ({
      url: `/api/tourData/tours/${id()}/travelInfo`,
      method: 'GET',
      params: {
        'userLatitude': location.latitude,
        'userLongitude': location.longitude,
      },
      reportProgress: true,
    }));
  }
}