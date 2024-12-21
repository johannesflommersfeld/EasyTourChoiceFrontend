export interface ITour {
    //TODO: add documentation
    id: number;
    travelDetails: any;
    bulletin: any;
    weatherForecast: any;
    name: string;
    activityType: Activity;
    startingLocationId: number;
    activityLocationId: number;
    duration: number;
    approachDuration: number;
    metersOfElevation: number;
    distance: number;
    shortDescription: string;
    difficulty: number;
    risk: number;
    aspect: number;
    areaId: number;
    avalancheRegionID: number;
}

export class Tour implements ITour {
    id: number;
    travelDetails: any; //TODO: define type
    bulletin: any; //TODO define type
    weatherForecast: any; //TODO: define type
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