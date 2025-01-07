import { ForecastData } from "./forecast-data.model";

export class ForecastTimeStep {
  time: any;
  data: ForecastData;
  constructor(time: any, data: ForecastData) {
    this.time = time;
    this.data = data;
  }
}