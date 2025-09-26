import { ForecastTimeInstant } from "./forecast-time-intant";
import { ForecastTimePeriod } from "./forecast-time-period";

export class ForecastData {
  instant: ForecastTimeInstant;
  nextOneHours: ForecastTimePeriod;

  constructor(instant: ForecastTimeInstant, nextOneHours: ForecastTimePeriod) {
    this.instant = instant;
    this.nextOneHours = nextOneHours;
  }
}
