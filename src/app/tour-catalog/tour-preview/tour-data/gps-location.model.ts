export class GPSLocation {
  id: number | null = null;
  latitude: number; // latitude with decimal minutes
  longitude: number; // longitude with decimal minutes
  altitude: number | null = null; // altitude in meter

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}