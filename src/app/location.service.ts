import { Injectable } from '@angular/core';
import { GPSLocation } from './models/tour-data/gps-location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  async getLocation(): Promise<GPSLocation> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resp => {
          resolve({
            id: null,
            longitude: resp.coords.longitude,
            latitude: resp.coords.latitude,
            altitude: resp.coords.altitude
          });
        },
          err => {
            reject(err);
          });
      } else {
        reject(new Error('Geolocation API is not available'));
      }
    });
  }
}
