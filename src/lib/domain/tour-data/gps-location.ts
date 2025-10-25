export class GPSLocation {
  locationId: number | null = null;
  latitude: number | null; // latitude with decimal minutes
  longitude: number | null; // longitude with decimal minutes
  altitude: number | null = null; // altitude in meter

  constructor(latitude: number | null, longitude: number | null) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}