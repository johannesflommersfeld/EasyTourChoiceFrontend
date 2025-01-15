import { Component } from '@angular/core';
import { ITour } from '../tour-catalog/tour-preview/tour-data/tour.model';
import { ActivityPipe } from "../tour-catalog/tour-preview/activity.pipe";
import { KilometersPipe } from "../tour-catalog/tour-preview/kilometers.pipe";
import { ToursService } from '../tours.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DurationPipe } from "./duration.pipe";
import { WeatherForecastComponent } from "./weather-forecast/weather-forecast.component";

@Component({
  selector: 'etc-tour-details',
  imports: [ActivityPipe, KilometersPipe, CommonModule, DurationPipe, WeatherForecastComponent],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.css'
})
export class TourDetailsComponent {
  tour: ITour | null = null;

  constructor(
    private toursSvc: ToursService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // TODO: get current location and submit
    this.route.paramMap.subscribe(paramMap => {
      let tourId: string | null = paramMap.get('tourId');
      if (tourId != null) {
        this.tour = this.toursSvc.getTourById(+tourId);
      }
    });
  }
}
