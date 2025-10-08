import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '../domain/tour-data/activity';
import { RiskLevel } from '../domain/tour-data/risk-level';
import { GeneralDifficulty } from '../domain/tour-data/general-difficulty';

@Pipe({
  name: 'kilometers',
})
export class KilometersPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
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
  activityStrings = new Map<Activity, string>([
    [Activity.HIKING, 'Hike'],
    [Activity.TREKKING, 'Trekking tour'],
    [Activity.BOULDERING, 'Boulder'],
    [Activity.SPORTCLIMBING, 'Sport climb'],
    [Activity.MULTIPITCHCLIMBING, 'Multi-pitch climb'],
    [Activity.VIA_VERRATA, 'Via verrata'],
    [Activity.MOUNTAINBIKING, 'MTB tour'],
    [Activity.ROADCYCLING, 'Road cycling tour'],
    [Activity.GRAVEL, 'Gravel tour'],
    [Activity.BIKEPACKING, 'Bike packing tour'],
    [Activity.SKITOURING, 'Ski tour'],
  ]);

  transform(value: Activity): string {
    return `${this.activityStrings.get(value)}`;
  }
}

@Pipe({
  name: 'risk',
})
export class RiskPipe implements PipeTransform {
  transform(value: RiskLevel | null): string {
    if (value == null) {
      return 'unknown'
    }
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
    const day: number = date.getDay();
    const month: string = this.months[date.getMonth()];
    return `${month} ${day}:${hour}h`;
  }
}

@Pipe({
  name: 'meters',
})
export class MetersPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '--'
    }
    return `${value} m`;
  }
}

@Pipe({
  name: 'difficulty',
})
export class DifficultyPipe implements PipeTransform {
  transform(value: GeneralDifficulty | null): string {
    if (value == null) {
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
  transform(value: number | null): string {
    if (value === null) {
      return '--'
    }
    const hours: number = Math.floor(value);
    const minutes: string = `${Math.round((value - hours) * 60)}`.padStart(2, '0');
    return `${hours}h ${minutes}min`;
  }
}