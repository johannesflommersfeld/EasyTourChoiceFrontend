import { ForecastTimeStep } from "./forecast-time-step.model";
import { Meta } from "./meta.model";

export class WeatherForecast {
  Meta: Meta;
  Timeseries: Array<ForecastTimeStep>;

  constructor(meta: Meta, timeseries: Array<ForecastTimeStep>) {
    this.Meta = meta;
    this.Timeseries = timeseries;
  }
}