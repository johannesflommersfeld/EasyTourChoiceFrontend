import { Activity } from "./activity.model";
import { Aspect } from "./aspect.model";
import { AvalancheBulletin } from "./avalanche-bulletin.model";
import { GeneralDifficulty } from "./general-difficulty.model";
import { GPSLocation } from "./gps-location.model";
import { RiskLevel } from "./risk-level.model";
import { TravelDetails } from "./travel-details.model";
import { WeatherForecast } from "./weather-forecast.model";

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


export class Tour implements ITour {
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
  areaId: number;
  avalancheRegionID: number | null;
  imageName: string;
  startingLocation: GPSLocation | null;
  activityLocation: GPSLocation | null;

  constructor(
    id: number,
    travelDetails: TravelDetails | null,
    bulletin: AvalancheBulletin | null,
    weatherForecast: WeatherForecast | null,
    description: string,
    name: string,
    imageName: string,
    activity: Activity,
    distance: number | null,
    startingLocationId: number,
    activityLocationId: number,
    duration: number | null,
    approachDuration: number | null,
    metersOfElevation: number | null,
    difficulty: GeneralDifficulty | null,
    risk: RiskLevel | null,
    aspect: Aspect | null,
    areaId: number,
    avalancheRegionID: number | null,
    startingLocation: GPSLocation | null,
    activityLocation: GPSLocation | null
  ) {
    this.id = id;
    this.travelDetails = travelDetails;
    this.bulletin = bulletin;
    this.weatherForecast = weatherForecast;
    this.name = name;
    this.imageName = imageName;
    this.distance = distance;
    this.activityType = activity;
    this.startingLocationId = startingLocationId;
    this.activityLocationId = activityLocationId;
    this.duration = duration;
    this.approachDuration = approachDuration;
    this.metersOfElevation = metersOfElevation;
    this.shortDescription = description;
    this.difficulty = difficulty;
    this.risk = risk;
    this.aspect = aspect;
    this.areaId = areaId;
    this.avalancheRegionID = avalancheRegionID;
    this.startingLocation = startingLocation;
    this.activityLocation = activityLocation;
  }

  getActivity(): string {
    switch (this.activityType) {
      case Activity.HIKING:
        return 'hiking';
      case Activity.TREKKING:
        return 'trekking';
      case Activity.BOULDERING:
        return 'bouldering';
      case Activity.SPORTCLIMBING:
        return 'sport climbing';
      case Activity.MULTIPITCHCLIMBING:
        return 'mulit-pitch climbing';
      case Activity.VIA_VERRATA:
        return 'via verrata';
      case Activity.MOUNTAINBIKING:
        return 'mountainbiking';
      case Activity.ROADCYCLING:
        return 'road cycling';
      case Activity.GRAVEL:
        return 'gravel biking';
      case Activity.BIKEPACKING:
        return 'bike packing';
      case Activity.SKITOURING:
        return 'ski touring';
      default:
        return '';
    }
  }
}