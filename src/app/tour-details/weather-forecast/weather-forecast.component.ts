import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecast } from '../../tour-catalog/tour-preview/tour-data/weather-forecast.model';
import { ForecastTimeStep } from '../../tour-catalog/tour-preview/tour-data/forecast-time-step.model';
import { WeatherSymbol } from '../../tour-catalog/tour-preview/tour-data/weather-symbol.model';
import { HourPipe } from "./hour.pipe";

@Component({
  selector: 'etc-weather-forecast',
  imports: [HourPipe, CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastComponent {
  @Input() forecast: WeatherForecast | undefined;

  getWeatherForNext16Hours(): ForecastTimeStep[] {
    if (this.forecast?.timeseries == undefined) {
      return [];
    }

    if (this.forecast.timeseries.length < 16) {
      return this.forecast.timeseries
    }
    return this.forecast.timeseries.slice(0, 16);
  }

  getTemperatureUnit(): string {
    if (this.forecast == undefined) {
      return "-";
    }
    let unit = this.forecast.meta.units.airTemperature;
    if (unit == "celsius") {
      return "°C";
    }
    else if (unit == "farenheit") {
      return "°F";
    }
    return unit;
  }

  getTemperature(timeStep: ForecastTimeStep): string {
    if (timeStep.data.instant.airTemperature == undefined) {
      return "-";
    }
    return `${timeStep.data.instant.airTemperature}`;
  }

  getPrecipicationUnit(): string {
    if (this.forecast == undefined) {
      return "-";
    }
    return this.forecast.meta.units.precipitationAmount;
  }

  getPrecipication(timeStep: ForecastTimeStep): string {
    if (timeStep.data.nextOneHours.details?.precipitationAmount == undefined) {
      return "-";
    }
    return `${timeStep.data.nextOneHours.details?.precipitationAmount}`;
  }

  getPrecipicationProbability(timeStep: ForecastTimeStep): string {
    if (timeStep.data.nextOneHours.details?.probabilityOfPrecipitation == undefined) {
      return "-";
    }
    return `${timeStep.data.nextOneHours.details?.probabilityOfPrecipitation}`;
  }

  getWindSpeedUnit(): string {
    if (this.forecast == undefined) {
      return "-";
    }
    return this.forecast.meta.units.windSpeed;
  }

  getWindSpeed(timeStep: ForecastTimeStep): string {
    if (timeStep.data.instant.windSpeed == undefined) {
      return "-";
    }
    return `${timeStep.data.instant.windSpeed}`;
  }

  getWeatherSymbolPath(timeStep: ForecastTimeStep): string {
    let symbol: WeatherSymbol | null = timeStep.data.nextOneHours.symbolCode;
    if (symbol == null) {
      throw new Error("No weather symbol in forecast.");
    }
    let symbolName: string = `${symbol}`.padStart(2, '0');
    return `/weather-symbols/darkmode/${symbolName}.svg`
  }

  windDirectionIsValid(timeStep: ForecastTimeStep): boolean {
    return timeStep.data.instant.windFromDirection != undefined
      && timeStep.data.instant.windFromDirection >= 0
      && timeStep.data.instant.windFromDirection <= 360;
  }

  getWindSymbolPath(timeStep: ForecastTimeStep): string {
    if (!this.windDirectionIsValid(timeStep)) {
      throw new Error("Invalid wind direction in forecast.");
    }
    let angle: number = timeStep.data.instant.windFromDirection!;

    let filename: string = "";
    if (angle >= 338 || angle <= 22) {
      filename = "1.svg";
    }
    else if (angle > 22 && angle < 68) {
      filename = "2.svg";
    }
    else if (angle >= 68 && angle <= 112) {
      filename = "3.svg";
    }
    else if (angle > 112 && angle < 158) {
      filename = "4.svg";
    }
    else if (angle >= 158 && angle <= 202) {
      filename = "5.svg";
    }
    else if (angle > 202 && angle < 248) {
      filename = "6.svg";
    }
    else if (angle >= 248 && angle <= 292) {
      filename = "7.svg";
    }
    else {
      filename = "8.svg";
    }
    return `/weather-symbols/wind/${filename}`
  }
}
