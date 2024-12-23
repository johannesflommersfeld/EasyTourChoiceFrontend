import { GPSLocation } from "./gps-location.model";

export class TravelDetails {
  targetLocationId: number | null = null;
  startingLocation: GPSLocation | null = null;
  travelTime: number | null = null; // traveling time with the car in hours
  travelDistance: number | null = null; // traveling time with the car in hours
}
