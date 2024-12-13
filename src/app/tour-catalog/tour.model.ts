export interface ITour {
    id: number;
    description: string;
    name: string;
    imageName: string;
    activity: Activity;
    distance: number;

    getActivity(): string;
}

export class Tour implements ITour {
    id: number;
    description: string;
    name: string;
    imageName: string;
    activity: Activity;
    distance: number;

    constructor(id: number, description: string, name: string, imageName: string, activity: Activity, distance: number) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.imageName = imageName;
        this.activity = activity;
        this.distance = distance;
    }

    getActivity(): string {
        switch (this.activity)
        {
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