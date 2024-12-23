import { AvalancheBulletin } from "./avalanche-bulletin.model";
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
    duration: number;
    approachDuration: number;
    metersOfElevation: number;
    distance: number;
    shortDescription: string;
    difficulty: any; // TODO
    risk: any; // TODO
    aspect: any; // TODO
    areaId: number;
    avalancheRegionID: number;
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
    duration: number;
    approachDuration: number;
    metersOfElevation: number;
    distance: number;
    shortDescription: string;
    difficulty: number; //TODO: define enum
    risk: number; //TODO: define enum
    aspect: number;
    areaId: number;
    avalancheRegionID: number;
    imageName: string;

    constructor(
        id: number,
        travelDetails: TravelDetails | null,
        bulletin: AvalancheBulletin | null,
        weatherForecast: WeatherForecast | null,
        description: string,
        name: string,
        imageName: string,
        activity: Activity,
        distance: number,
        startingLocationId: number,
        activityLocationId: number,
        duration: number,
        approachDuration: number,
        metersOfElevation: number,
        difficulty: number,
        risk: number,
        aspect: number,
        areaId: number,
        avalancheRegionID: number
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

export enum Activity {
    UNDEFINED,
    HIKING,
    TREKKING,
    BOULDERING,
    SPORTCLIMBING,
    MULTIPITCHCLIMBING,
    VIA_VERRATA,
    MOUNTAINBIKING,
    ROADCYCLING,
    GRAVEL,
    BIKEPACKING,
    SKITOURING,
}