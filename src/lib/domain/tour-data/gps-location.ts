
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
  locationId: number | null;
  latitude: number | string; // latitude with decimal minutes
  longitude: number | string; // longitude with decimal minutes
  altitude: number | null;

  toLocation(): GPSLocation | null;
}

export function toLocation(this: IGPSLocationForForm): GPSLocation | null {
  const latitude =  !isNaN(Number(this.latitude)) && isFinite(Number(this.latitude)) ? Number(this.latitude) : null
  const longitude =  !isNaN(Number(this.longitude)) && isFinite(Number(this.longitude)) ? Number(this.longitude) : null
  if (!this.latitude && !this.longitude)
    return null
  return {
    latitude: latitude,
    longitude: longitude,
    altitude: this.altitude,
    locationId: this.locationId,
  }
}