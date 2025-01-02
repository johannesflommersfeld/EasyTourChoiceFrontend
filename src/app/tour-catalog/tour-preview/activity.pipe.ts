import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from './tour-data/activity.model';

@Pipe({
  name: 'activity',
})
export class ActivityPipe implements PipeTransform {
  activityStrings: Map<Activity, string> = new Map([
    [Activity.HIKING, 'hiking'],
    [Activity.TREKKING, 'trekking'],
    [Activity.BOULDERING, 'bouldering'],
    [Activity.SPORTCLIMBING, 'sport climbing'],
    [Activity.MULTIPITCHCLIMBING, 'multi pitch'],
    [Activity.VIA_VERRATA, 'via verrata'],
    [Activity.MOUNTAINBIKING, 'mountain biking'],
    [Activity.ROADCYCLING, 'road cycling'],
    [Activity.GRAVEL, 'gravel biking'],
    [Activity.BIKEPACKING, 'bike packing'],
    [Activity.SKITOURING, 'ski touring'],
  ]);

  transform(value: Activity): string {
    return `${this.activityStrings.get(value)}`;
  }
}