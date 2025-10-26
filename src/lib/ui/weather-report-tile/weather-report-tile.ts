import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HourPipe } from '../../utils/pipes';
import { ForecastTimeStep } from '../../domain/tour-data/forecast-time-step';
import { WeatherSymbol } from '../../domain/tour-data/weather-symbol';
import { Meta } from '../../domain/tour-data/meta';

@Component({
  selector: 'app-weather-report-tile',
  imports: [
    MatCardModule,
    HourPipe,
  ],
  templateUrl: './weather-report-tile.html',
  styleUrl: './weather-report-tile.scss'
})
export class WeatherReportTile {
  weatherInfo = input.required<ForecastTimeStep>();
  meta = input.required<Meta>()

  protected weatherSymbolPath = () => {
    let symbol: WeatherSymbol | null = this.weatherInfo().data.nextOneHours.symbolCode;
    if (!symbol) {
      throw new Error("No weather symbol in forecast.");
    }
    let symbolName: string = `${symbol}`.padStart(2, '0');
    console.log(symbolName);
    return `/weather-symbols/${symbolName}.svg`
  }

  protected temperatureUnit = () => {
    const meta = this.meta();
    if (!meta) {
      return "-";
    }
    let unit = meta.units.airTemperature;
    if (unit == "celsius") {
      return "°C";
    }
    else if (unit == "farenheit") {
      return "°F";
    }
    return unit;
  }

  protected precipicationUnit = () => {
    const meta = this.meta();
    if (!meta) {
      return "-";
    }
    return meta.units.precipitationAmount;
  }

  protected windSpeedUnit = () => {
    const meta = this.meta();
    if (!meta) {
      return "-";
    }
    return meta.units.windSpeed;
  }

  protected precipitationProbability = () => {
    const prob = this.weatherInfo().data.nextOneHours.details?.probabilityOfPrecipitation 
    if (!prob) {
      return "-"
    }

    return prob;
  }

  protected precipitationAmount = () => {
    const amount = this.weatherInfo().data.nextOneHours.details?.precipitationAmount 
    if (!amount) {
      return "-"
    }

    return amount;
  }
}
