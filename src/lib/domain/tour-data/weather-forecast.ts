import { ForecastTimeStep } from "./forecast-time-step";
import { Meta } from "./meta";

export class WeatherForecast {
  meta: Meta;
  timeseries: ForecastTimeStep[];

  constructor(meta: Meta, timeseries: ForecastTimeStep[]) {
    this.meta = meta;
    this.timeseries = timeseries;
  }
}