import { ForecastTimePeriodDetails } from "./forecast-time-period-details.model";
import { WeatherSymbol } from "./weather-symbol.model";

export class ForecastTimePeriod {
  Details: ForecastTimePeriodDetails | null = null;
  SymbolCode: WeatherSymbol | null = null;
}