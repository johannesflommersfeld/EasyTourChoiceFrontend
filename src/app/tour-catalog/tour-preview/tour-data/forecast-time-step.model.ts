import { ForecastData } from "./forecast-data.model";

export class ForecastTimeStep {
  Time: any;
  Data: ForecastData;
  constructor(time: any, data: ForecastData) {
    this.Time = time;
    this.Data = data;
  }
}