import { ForecastTimePeriodDetails } from "./forecast-time-period-details";
import { WeatherSymbol } from "./weather-symbol";

export class ForecastTimePeriod {
  details: ForecastTimePeriodDetails | null = null;
  symbolCode: WeatherSymbol | null = null;
}