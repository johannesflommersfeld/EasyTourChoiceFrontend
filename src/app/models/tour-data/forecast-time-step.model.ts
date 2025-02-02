import { ForecastData } from "./forecast-data.model";

export class ForecastTimeStep {
  time: string;
  data: ForecastData;
  constructor(time: string, data: ForecastData) {
    this.time = time;
    this.data = data;
  }
}