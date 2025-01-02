import { ForecastUnits } from "./forecast-units.model";

export class Meta {
  UpdatedAt: any;
  Units: ForecastUnits;

  constructor(updatedAt: any, units: ForecastUnits) {
    this.UpdatedAt = updatedAt;
    this.Units = units;
  }
}