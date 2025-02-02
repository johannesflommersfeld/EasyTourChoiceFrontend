import { ForecastTimeStep } from "./forecast-time-step.model";
import { Meta } from "./meta.model";

export class WeatherForecast {
  meta: Meta;
  timeseries: Array<ForecastTimeStep>;

  constructor(meta: Meta, timeseries: Array<ForecastTimeStep>) {
    this.meta = meta;
    this.timeseries = timeseries;
  }
}