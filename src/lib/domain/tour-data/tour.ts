import { Activity } from "./activity";
import { Aspect } from "./aspect";
import { AvalancheBulletin } from "./avalanche-bulletin";
import { GeneralDifficulty } from "./general-difficulty";
import { GPSLocation } from "./gps-location";
import { RiskLevel } from "./risk-level";
import { TravelDetails } from "./travel-details";
import { WeatherForecast } from "./weather-forecast";

export interface ITour {
  //TODO: add documentation
  id: number;
  travelDetails: TravelDetails | null;
  bulletin: AvalancheBulletin | null;
  weatherForecast: WeatherForecast | null;
  name: string;
  activityType: Activity;
  startingLocationId: number;
  activityLocationId: number;
  duration: number | null;
  approachDuration: number | null;
  metersOfElevation: number | null;
  distance: number | null;
  shortDescription: string | null;
  difficulty: GeneralDifficulty | null;
  risk: RiskLevel | null;
  aspect: Aspect | null;
  areaId: number | null;
  avalancheRegionID: number | null;
  startingLocation: GPSLocation | null;
  activityLocation: GPSLocation | null;
}

export interface ITourWithLocations extends ITour {
  //TODO: add documentation
  id: number;
  travelDetails: TravelDetails | null;
  bulletin: AvalancheBulletin | null;
  weatherForecast: WeatherForecast | null;
  name: string;
  activityType: Activity;
  startingLocationId: number;
  activityLocationId: number;
  duration: number | null;
  approachDuration: number | null;
  metersOfElevation: number | null;
  distance: number | null;
  shortDescription: string | null;
  difficulty: GeneralDifficulty | null;
  risk: RiskLevel | null;
  aspect: Aspect | null;
  areaId: number | null;
  avalancheRegionID: number | null;
  startingLocation: GPSLocation;
  activityLocation: GPSLocation;
}