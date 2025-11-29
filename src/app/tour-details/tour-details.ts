import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ITour } from '../../lib/domain/tour-data/tour';
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
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../lib/ui/delete-dialog/delete-dialog';
import { lastValueFrom } from 'rxjs';
import { WeatherReportScroller } from '../../lib/ui/weather-report-scroller/weather-report-scroller';
import { ActivityPipe, DifficultyPipe, DurationPipe, KilometersPipe, MetersPipe, RiskPipe, TimePipe } from '../../lib/utils/pipes';
import { AvalancheReportScroller } from '../../lib/ui/avalanche-report-scroller/avalanche-report-scroller';
import { AspectIndicatorComponent } from '../../lib/ui/aspect-indicator/aspect-indicator';
import { Aspect } from '../../lib/domain/tour-data/aspect';
import { MapComponent } from '../../lib/ui/map/map';
import { RouteIndicationDirective } from '../../lib/ui/map/route-indication';

@Component({
  selector: 'app-tour-details',
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    WeatherReportScroller,
    AvalancheReportScroller,
    TimePipe,
    ActivityPipe,
    KilometersPipe,
    DurationPipe,
    MetersPipe,
    RiskPipe,
    DifficultyPipe,
    AspectIndicatorComponent,
    MapComponent,
    RouteIndicationDirective,
  ],
  templateUrl: './tour-details.html',
  styleUrl: './tour-details.scss'
})
export class TourDetailsComponent implements OnInit{
  private router = inject(Router);
  private tourService = inject(ToursService);
  private travelInfoService = inject(TravelInfoService);
  private locationService = inject(LocationService);
  private dialog = inject(MatDialog);

  protected tourId = input<number>();

  protected tour: HttpResourceRef<ITour | undefined>;
  protected weatherForecast: HttpResourceRef<WeatherForecast | undefined>;
  protected avalancheReport: HttpResourceRef<AvalancheBulletin | undefined>;
  protected travelInfo: HttpResourceRef<TravelDetails | undefined>;

  protected location = signal<GPSLocation | undefined>(undefined);

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

  protected async onDeleteTour() {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(async result => {
      const tourId  = this.tourId();
      if (result && tourId) {
        await lastValueFrom(this.tourService.deleteTour(tourId));
        this.router.navigate(['/tour-catalog'])
      }
    });
  };

  protected getAspects(): Aspect | undefined { 
    const tour = this.tour.value()
    if (tour) {
      return tour.aspect ?? Aspect.UNKNOWN;
    }
    return undefined;
  }

  protected getLocation(startingLocation: GPSLocation | undefined | null, activityLocation: GPSLocation | undefined | null): GPSLocation | undefined
  {
    if (startingLocation){
      return startingLocation;
    }
    if (activityLocation) {
      return activityLocation;
    }
    return undefined;
  }
}
