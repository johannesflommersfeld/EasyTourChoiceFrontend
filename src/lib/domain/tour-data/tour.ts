import { Activity } from "./activity";
import { Aspect } from "./aspect";
import { AvalancheBulletin } from "./avalanche-bulletin";
import { GeneralDifficulty } from "./general-difficulty";
import { GPSLocation, IGPSLocationForForm } from "./gps-location";
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
  duration: number | null | undefined;
  approachDuration: number | null | undefined;
  metersOfElevation: number | null | undefined;
  distance: number | null | undefined;
  shortDescription: string | null | undefined;
  difficulty: GeneralDifficulty | null | undefined;
  risk: RiskLevel | null | undefined;
  aspect: Aspect | null | undefined;
  areaId: number | null;
  avalancheRegionID: number | null;
  startingLocation: GPSLocation | null | undefined;
  activityLocation: GPSLocation | null | undefined;
}

export interface ITourForm {
  id: number;
  name: string;
  activityType: Activity;
  duration: number | string;
  approachDuration: number | string;
  metersOfElevation: number | string;
  distance: number | string;
  shortDescription: string;
  difficulty: GeneralDifficulty;
  risk: RiskLevel;
  aspect: Aspect;
  startingLocation: IGPSLocationForForm;
  activityLocation: IGPSLocationForForm;
}