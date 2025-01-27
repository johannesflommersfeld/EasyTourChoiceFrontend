import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from './tour-data/activity.model';

@Pipe({
  name: 'activity',
})
export class ActivityPipe implements PipeTransform {
  activityStrings: Map<Activity, string> = new Map([
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