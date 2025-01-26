import { Component, OnInit } from '@angular/core';
import { ITour } from '../tour-catalog/tour-preview/tour-data/tour.model';
import { ActivityPipe } from "../tour-catalog/tour-preview/activity.pipe";
import { KilometersPipe } from "../tour-catalog/tour-preview/kilometers.pipe";
import { ToursService } from '../tours.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DurationPipe } from "./duration.pipe";
import { WeatherForecastComponent } from "./weather-forecast/weather-forecast.component";
import { AvalancheReportComponent } from './avalanche-report/avalanche-report.component';
import { LocationService } from '../location.service';
import { GPSLocation } from '../tour-catalog/tour-preview/tour-data/gps-location.model';
import { Observable, ObservableInputTuple, of, switchMap } from 'rxjs';

@Component({
  selector: 'etc-tour-details',
  imports: [ActivityPipe, KilometersPipe, CommonModule, DurationPipe, WeatherForecastComponent, AvalancheReportComponent],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.css'
})
export class TourDetailsComponent implements OnInit {
  tour: ITour | null = null;
  avalancheActivityText$: Observable<string[]> = of([]);
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

    this.route.paramMap.subscribe(paramMap => {
      const tourId: string | null = paramMap.get('tourId');
      if (tourId) {
        this.toursSvc.fetchTourById(+tourId).subscribe(tour => {
          this.toursSvc.fetchWeatherForecastById(+tourId).subscribe(travelInfo => {
            tour.weatherForecast = travelInfo;
          });
          this.toursSvc.fetchAvalancheReportById(+tourId).subscribe(bulletin => {
            tour.bulletin = bulletin;
          });
          if (this.location) {
            this.toursSvc.fetchTravelInfoById(+tourId, this.location).subscribe(travelDetails => {
              tour.travelDetails = travelDetails;
            });
          }
          this.tour = tour;
        });
      }
    });
  }
}
