import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Tour } from '../../lib/domain/tour-data/tour';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToursService } from '../services/tours';
import { HttpResourceRef } from '@angular/common/http';
import { WeatherForecast } from '../../lib/domain/tour-data/weather-forecast';
import { AvalancheBulletin } from '../../lib/domain/tour-data/avalanche-bulletin';
import { TravelInfoService } from '../services/travel-info';
import { GPSLocation } from '../../lib/domain/tour-data/gps-location';
import { TravelDetails } from '../../lib/domain/tour-data/travel-details';
import { LocationService } from '../services/location';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-details',
  imports: [MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './tour-details.html',
  styleUrl: './tour-details.scss'
})
export class TourDetailsComponent implements OnInit{
  private router = inject(Router);
  private tourService = inject(ToursService);
  private travelInfoService = inject(TravelInfoService);
  private locationService = inject(LocationService);

  protected tourId = input<string>();

  protected tour: HttpResourceRef<Tour | undefined>;
  protected weatherForecast: HttpResourceRef<WeatherForecast | undefined>;
  protected avalancheReport: HttpResourceRef<AvalancheBulletin | undefined>;
  protected travelInfo: HttpResourceRef<TravelDetails | undefined>;

  private location = signal<GPSLocation | undefined>(undefined);

  constructor() {
    this.tour = this.tourService.createSingleTourResource(this.tourId);
    this.weatherForecast = this.tourService.createWeatherForecastResourceById(this.tourId);
    this.avalancheReport = this.tourService.createAvalancheReportResourceById(this.tourId);
    this.travelInfo = this.travelInfoService.createTravelInfoResourceById(this.tourId, this.location);
  }

  async ngOnInit() {
    if (!this.location()) {
      this.location.set(await this.locationService.getLocation());
    }
  }

  protected onEditTour = () => this.router.navigate(['/edit-tour', this.tourId()]);
}
