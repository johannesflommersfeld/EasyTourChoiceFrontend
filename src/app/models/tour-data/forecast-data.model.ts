import { ForecastTimeInstant } from "./forecast-time-intant.model";
import { ForecastTimePeriod } from "./forecast-time-period.model";

export class ForecastData {
  instant: ForecastTimeInstant;
  nextOneHours: ForecastTimePeriod;

  constructor(instant: ForecastTimeInstant, nextOneHours: ForecastTimePeriod) {
    this.instant = instant;
    this.nextOneHours = nextOneHours;
  }
}
