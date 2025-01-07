import { ForecastUnits } from "./forecast-units.model";

export class Meta {
  updatedAt: any;
  units: ForecastUnits;

  constructor(updatedAt: any, units: ForecastUnits) {
    this.updatedAt = updatedAt;
    this.units = units;
  }
}