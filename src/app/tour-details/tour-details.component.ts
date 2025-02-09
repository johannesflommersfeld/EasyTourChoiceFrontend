import { Component, OnInit } from '@angular/core';
import { ITour } from '../models/tour-data/tour.model';
import { ActivityPipe } from "../tour-catalog/tour-preview/activity.pipe";
import { KilometersPipe } from "../tour-catalog/tour-preview/kilometers.pipe";
import { ToursService } from '../tours.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DurationPipe } from "./duration.pipe";
import { WeatherForecastComponent } from "./weather-forecast/weather-forecast.component";
import { AvalancheReportComponent } from './avalanche-report/avalanche-report.component';
import { LocationService } from '../location.service';
import { GPSLocation } from '../models/tour-data/gps-location.model';
import { forkJoin, Observable, of } from 'rxjs';
import { MetersPipe } from "./meters.pipe";
import { DifficultyPipe } from "./difficulty.pipe";
import { RsikPipe } from "./risk.pipe";
import { TimePipe } from "./time.pipe";
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { icon, Icon, latLng, Layer, marker, Map, tileLayer, polyline, LatLng } from 'leaflet';
import { WeatherForecast } from '../models/tour-data/weather-forecast.model';
import { AvalancheBulletin } from '../models/tour-data/avalanche-bulletin.model';
import { TravelDetails } from '../models/tour-data/travel-details.model';

@Component({
  selector: 'etc-tour-details',
  imports: [ActivityPipe, KilometersPipe, CommonModule, DurationPipe, WeatherForecastComponent, AvalancheReportComponent, MetersPipe, DifficultyPipe, RsikPipe, TimePipe, LeafletModule],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.css'
})
export class TourDetailsComponent implements OnInit {
  tour: ITour | null = null;
  avalancheActivityText$: Observable<string[]> = of([]);
  map: Map | null = null;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href = "https://www.openstreetmap.org/copyright" > OpenStreetMap </a> contributors' }),
    ] as Layer[],
    zoom: 8,
    center: latLng(46.879966, -121.726909)
  };
  private location: GPSLocation | null = null;

  constructor(
    private toursSvc: ToursService,
    private locationService: LocationService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    if (!this.location) {
      this.location = await this.locationService.getLocation();
    }
    const userMarker = marker([this.location.latitude, this.location.longitude], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
    this.options.layers.push(userMarker);
    this.options.center = latLng(this.location.latitude, this.location.longitude);

    this.route.paramMap.subscribe(paramMap => {
      const tourId: string | null = paramMap.get('tourId');

      if (tourId) {
        this.toursSvc.fetchTourById(+tourId).subscribe(tour => {
          const requests: Partial<{
            weatherForecast: Observable<WeatherForecast>;
            avalancheReport: Observable<AvalancheBulletin>;
            travelInfo?: Observable<TravelDetails>;
          }> = {
            weatherForecast: this.toursSvc.fetchWeatherForecastById(+tourId),
            avalancheReport: this.toursSvc.fetchAvalancheReportById(+tourId),
          };

          // Add travelInfo conditionally
          if (this.location) {
            requests.travelInfo = this.toursSvc.fetchTravelInfoById(+tourId, this.location);
          }

          // Run all requests in parallel
          forkJoin(requests).subscribe(results => {
            tour.weatherForecast = results.weatherForecast!;
            tour.bulletin = results.avalancheReport!;

            if (results.travelInfo) {
              tour.travelDetails = results.travelInfo;
              this.renderTrackPolyline();
            }

            this.tour = tour;

            if (this.tour.activityLocation) {
              const targetMarker = marker([this.tour.activityLocation.latitude, this.tour.activityLocation.longitude], {
                icon: icon({
                  ...Icon.Default.prototype.options,
                  iconUrl: 'assets/marker-icon.png',
                  iconRetinaUrl: 'assets/marker-icon-2x.png',
                  shadowUrl: 'assets/marker-shadow.png'
                })
              });
              this.options.layers.push(targetMarker);
              this.options.center = latLng(this.tour.activityLocation.latitude, this.tour.activityLocation.longitude);
            }
          });
        });
      }
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.renderTrackPolyline();
    this.map.on('zoomend', () => {
      console.log(`Zoom level: ${this.map!.getZoom()}`);
    });
  }

  private renderTrackPolyline() {
    if (this.map && this.tour?.travelDetails?.route) {
      const trackCoordinates: LatLng[] = this.tour.travelDetails.route.map(loc => latLng(loc.latitude, loc.longitude));
      const trackPolyline = polyline(trackCoordinates, {
        color: 'blue',
        weight: 4,
        opacity: 0.7,
        lineJoin: 'round',
      });
      trackPolyline.addTo(this.map);
      this.map.fitBounds(trackPolyline.getBounds());
    }
  }
}