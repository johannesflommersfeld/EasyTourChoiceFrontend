import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '../domain/tour-data/activity';
import { RiskLevel } from '../domain/tour-data/risk-level';
import { GeneralDifficulty } from '../domain/tour-data/general-difficulty';
import { TendencyType } from '../domain/tour-data/tendency-type';
import { AvalancheProblemType } from '../domain/tour-data/avalanche-problem-type';

@Pipe({
  name: 'kilometers',
})
export class KilometersPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (!value) {
      return '--'
    }
    const rounded: number = Math.round(value);
    return `${rounded} km`;
  }
}

@Pipe({
  name: 'activity',
})
export class ActivityPipe implements PipeTransform {
  static activityStrings = new Map<Activity, string>([
    [Activity.UNDEFINED, 'Undefined'],
    [Activity.HIKING, 'Hike'],
    [Activity.TREKKING, 'Trekking'],
    [Activity.BOULDERING, 'Bouldering'],
    [Activity.SPORTCLIMBING, 'Sport Climbing'],
    [Activity.MULTIPITCHCLIMBING, 'Multi-pitch Climbing'],
    [Activity.VIA_VERRATA, 'Via Verrata'],
    [Activity.MOUNTAINBIKING, 'Mountainbiking'],
    [Activity.ROADCYCLING, 'Road cycling'],
    [Activity.GRAVEL, 'Gravelbiking'],
    [Activity.BIKEPACKING, 'Bike Packing'],
    [Activity.SKITOURING, 'Ski Touring'],
  ]);

  static transform(value: Activity): string {
    return `${ActivityPipe.activityStrings.get(value)}`;
  }

  transform(value: Activity): string {
    return ActivityPipe.transform(value);
  }
}

@Pipe({
  name: 'risk',
})
export class RiskPipe implements PipeTransform {
  transform(value: RiskLevel | null): string {
    if (value == RiskLevel.VERY_SAFE) {
      return 'very safe'
    }
    else if (value == RiskLevel.SAFE) {
      return 'safe'
    }
    else if (value == RiskLevel.MODERATE_RISK) {
      return 'moderate risk'
    }
    else if (value == RiskLevel.HIGH_RISK) {
      return 'high risk'
    }
    else if (value == RiskLevel.DANGEROUS) {
      return 'dangerous'
    }
    return 'unknown'
  }
}

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  private readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  transform(value: string): string {
    const date: Date = new Date(value);
    const hour: number = date.getHours();
    const day: number = date.getDate();
    const month: string = this.months[date.getMonth()];
    return `${month} ${day}, ${hour}h`;
  }
}

@Pipe({
  name: 'meters',
})
export class MetersPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (!value) {
      return '--'
    }
    return `${value} m`;
  }
}

@Pipe({
  name: 'difficulty',
})
export class DifficultyPipe implements PipeTransform {
  transform(value: GeneralDifficulty | null | undefined): string {
    if (!value) {
      return 'unknown'
    }
    if (value == GeneralDifficulty.EASY) {
      return 'easy'
    }
    else if (value == GeneralDifficulty.MILDLY_CHALLENGING) {
      return 'mildly challenging'
    }
    else if (value == GeneralDifficulty.CHALLENGING) {
      return 'challenging'
    }
    else if (value == GeneralDifficulty.VERY_CHALLENGING) {
      return 'very challenging'
    }
    return 'unknown'
  }
}

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (!value) {
      return '--'
    }
    const hours: number = Math.floor(value);
    const minutes: string = `${Math.round((value - hours) * 60)}`.padStart(2, '0');
    return `${hours}h ${minutes}min`;
  }
}

@Pipe({
  name: 'hour',
})
export class HourPipe implements PipeTransform {
  transform(value: string): string {
    const hour = new Date(value).getHours()
    return `${hour} h`;
  }
}

@Pipe({
  name: 'elevation',
})
export class ElevationPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return ''
    }
    if (value == 'treeline') {
      return value;
    }
    return `${value} m`;
  }
}

@Pipe({
  name: 'tendency',
})
export class TendencyPipe implements PipeTransform {
  transform(value: TendencyType | null | undefined): string {
    switch (value) {
      case TendencyType.DECREASING:
        return 'decreasing';
      case TendencyType.INCREASING:
        return 'increasing';
      case TendencyType.STEADY:
        return 'steady';
      default:
        return 'unknown'
    }
  }
}

@Pipe({
  name: 'problem',
})
export class ProblemPipe implements PipeTransform {
  transform(value: AvalancheProblemType): string {
    const problemNames = new Map<AvalancheProblemType, string>([
      [AvalancheProblemType.NEW_SNOW, 'New snow'],
      [AvalancheProblemType.WIND_SLAB, 'Wind slab'],
      [AvalancheProblemType.GLIDING_SNOW, 'Gliding snow'],
      [AvalancheProblemType.WET_SNOW, 'Wet snow'],
      [AvalancheProblemType.PERSISTENT_WEAK_LAYERS, 'Persistent weak layer'],
      [AvalancheProblemType.CORNICES, 'Cornices'],
    ]);

    return problemNames.get(value) ?? '';
  }
}