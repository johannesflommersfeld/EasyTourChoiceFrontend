import { Component, SimpleChanges } from '@angular/core';
import { ITour } from '../tour-catalog/tour-preview/tour-data/tour.model';
import { ActivityPipe } from "../tour-catalog/tour-preview/activity.pipe";
import { KilometersPipe } from "../tour-catalog/tour-preview/kilometers.pipe";
import { ToursService } from '../tours.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DurationPipe } from "./duration.pipe";
import { WeatherForecastComponent } from "./weather-forecast/weather-forecast.component";
import { LocationService } from '../location.service';
import { GPSLocation } from '../tour-catalog/tour-preview/tour-data/gps-location.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'etc-tour-details',
  imports: [ActivityPipe, KilometersPipe, CommonModule, DurationPipe, WeatherForecastComponent],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.css'
})
export class TourDetailsComponent {
  tour: Observable<ITour> | null = null;
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
      let tourId: string | null = paramMap.get('tourId');
      if (tourId != null) {
        this.tour = this.toursSvc.fetchTourById(+tourId, this.location!);
      }
    });
  }
}
