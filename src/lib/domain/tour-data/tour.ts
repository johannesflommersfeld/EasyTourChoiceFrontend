import { Activity } from "./activity";
import { Aspect } from "./aspect";
import { AvalancheBulletin } from "./avalanche-bulletin";
import { GeneralDifficulty } from "./general-difficulty";
import { GPSLocation, IGPSLocationForForm, toLocation } from "./gps-location";
import { RiskLevel } from "./risk-level";
import { TravelDetails } from "./travel-details";
import { WeatherForecast } from "./weather-forecast";

export interface ITour {
  //TODO: add documentation
  id: number | null;
  travelDetails: TravelDetails | null;
  bulletin: AvalancheBulletin | null;
  weatherForecast: WeatherForecast | null;
  name: string;
  activityType: Activity;
  startingLocationId: number | null;
  activityLocationId: number | null;
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

  toTourForm(): ITourForm;
}

export interface ITourForm {
  id: number | null;
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
  startingLocationId: number | null;
  activityLocationId: number | null;
  areaId: number | null;
  avalancheRegionID: number | null;

  toTour(): ITour; 
}

export function toTour(this: ITourForm): ITour {
  return {
    ...this,
    shortDescription: this.shortDescription != "" ? this.shortDescription : null,
    duration: !isNaN(Number(this.duration)) && isFinite(Number(this.duration)) ? Number(this.duration) : null,
    distance: !isNaN(Number(this.distance)) && isFinite(Number(this.distance)) ? Number(this.distance) : null,
    approachDuration: !isNaN(Number(this.approachDuration)) && isFinite(Number(this.approachDuration)) ? Number(this.approachDuration) : null,
    metersOfElevation: !isNaN(Number(this.metersOfElevation)) && isFinite(Number(this.metersOfElevation)) ? Number(this.metersOfElevation) : null,
    travelDetails: null,
    bulletin: null,
    weatherForecast: null,
    startingLocation: this.startingLocation.toLocation(),
    activityLocation: this.activityLocation.toLocation(),
    toTourForm: toTourForm,
  }
}

export function toTourForm(this: ITour): ITourForm {
  return {
    ...this,
    shortDescription: this.shortDescription ?? "",
    duration: this.duration ?? "",
    distance: this.distance ?? "",
    difficulty: this.difficulty ?? GeneralDifficulty.UNKNOWN,
    risk: this.risk ?? RiskLevel.UNKNOWN,
    metersOfElevation: this.metersOfElevation ?? "",
    approachDuration: this.approachDuration ?? "",
    startingLocation: {
      locationId: this.startingLocation?.locationId ?? null,
      altitude: this.startingLocation?.altitude ?? null,
      latitude: this.startingLocation?.latitude ?? "",
      longitude: this.startingLocation?.longitude ?? "",
      toLocation: toLocation
    },
    activityLocation: {
      locationId: this.startingLocation?.locationId ?? null,
      altitude: this.startingLocation?.altitude ?? null,
      latitude: this.activityLocation?.latitude ?? "",
      longitude: this.activityLocation?.longitude ?? "",
      toLocation: toLocation
    },
    aspect: this.aspect ?? Aspect.UNKNOWN,
    toTour: toTour
  };
}