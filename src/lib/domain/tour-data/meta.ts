import { ForecastUnits } from "./forecast-units";

export class Meta {
  updatedAt: string;
  units: ForecastUnits;

  constructor(updatedAt: string, units: ForecastUnits) {
    this.updatedAt = updatedAt;
    this.units = units;
  }
}