export class GPSLocation {
  locationId: number | null = null;
  latitude: number | null | undefined; // latitude with decimal minutes
  longitude: number | null | undefined; // longitude with decimal minutes
  altitude: number | null = null; // altitude in meter

  constructor(latitude: number | null | undefined, longitude: number | null | undefined) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export interface IGPSLocationForForm {
  latitude: number | string; // latitude with decimal minutes
  longitude: number | string; // longitude with decimal minutes
}