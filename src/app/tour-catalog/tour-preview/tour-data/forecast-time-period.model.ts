import { ForecastTimePeriodDetails } from "./forecast-time-period-details.model";
import { WeatherSymbol } from "./weather-symbol.model";

export class ForecastTimePeriod {
  details: ForecastTimePeriodDetails | null = null;
  symbolCode: WeatherSymbol | null = null;
}