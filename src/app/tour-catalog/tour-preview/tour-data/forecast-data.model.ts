import { ForecastTimeInstant } from "./forecast-time-intant.model";
import { ForecastTimePeriod } from "./forecast-time-period.model";

export class ForecastData {
  Instant: ForecastTimeInstant;
  NextOneHours: ForecastTimePeriod;

  constructor(instant: ForecastTimeInstant, nextOneHours: ForecastTimePeriod) {
    this.Instant = instant;
    this.NextOneHours = nextOneHours;
  }
}
