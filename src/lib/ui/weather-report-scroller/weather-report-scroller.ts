import { Component, input, linkedSignal } from '@angular/core';
import { WeatherForecast } from '../../domain/tour-data/weather-forecast';
import { WeatherReportTile } from '../weather-report-tile/weather-report-tile';

@Component({
  selector: 'app-weather-report-scroller',
  imports: [WeatherReportTile],
  templateUrl: './weather-report-scroller.html',
  styleUrl: './weather-report-scroller.scss'
})
export class WeatherReportScroller {
  weatherForecast = input.required<WeatherForecast>()

  forecast16h = linkedSignal(() => {
    const forecast = this.weatherForecast();
    if (!forecast?.timeseries) {
      return [];
    }

    if (forecast.timeseries.length < 16) {
      return forecast.timeseries
    }
    return forecast.timeseries.slice(0, 16);
  });
}
