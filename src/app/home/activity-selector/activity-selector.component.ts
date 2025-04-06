import { NgFor } from '@angular/common';
import { Component, forwardRef, Provider } from '@angular/core';
import { Activity } from '../../models/tour-data/activity.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, RadioControlValueAccessor } from '@angular/forms';

const ACTIVITY_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ActivitySelectorComponent),
  multi: true,
}

@Component({
  selector: 'etc-activity-selector',
  imports: [NgFor, MatTooltipModule],
  templateUrl: './activity-selector.component.html',
  styleUrl: './activity-selector.component.scss',
  providers: [ACTIVITY_VALUE_ACCESSOR]
})
export class ActivitySelectorComponent implements ControlValueAccessor {
  readonly activitiesOrdered: Activity[] = [
    Activity.UNDEFINED,
    Activity.ROADCYCLING,
    Activity.GRAVEL,
    Activity.MOUNTAINBIKING,
    Activity.BIKEPACKING,
    // Activity.BOULDERING,
    // Activity.SPORTCLIMBING,
    // Activity.MULTIPITCHCLIMBING,
    Activity.VIA_VERRATA,
    Activity.HIKING,
    Activity.TREKKING,
    Activity.SKITOURING,
  ];

  readonly activityIconNames: Record<Activity, { FileName: string, ActivityName: string }> = {
    [Activity.UNDEFINED]: { FileName: 'activities/undefined.png', ActivityName: "Undefined" },
    [Activity.HIKING]: { FileName: 'activities/hiking.png', ActivityName: "Hiking" },
    [Activity.TREKKING]: { FileName: 'activities/trekking.png', ActivityName: "Trekking" },
    [Activity.BOULDERING]: { FileName: 'activities/bouldering.png', ActivityName: "Bouldering" },
    [Activity.SPORTCLIMBING]: { FileName: 'activities/sport-climbing.png', ActivityName: "Sport Climbing" },
    [Activity.MULTIPITCHCLIMBING]: { FileName: 'activities/multi-pitch-climbing.png', ActivityName: "Multi-pitch Climbing" },
    [Activity.VIA_VERRATA]: { FileName: 'activities/via-verrata.png', ActivityName: "Via Verrata" },
    [Activity.MOUNTAINBIKING]: { FileName: 'activities/mtb.png', ActivityName: "Mountainbiking" },
    [Activity.ROADCYCLING]: { FileName: 'activities/roadcycling.png', ActivityName: "Road Cycling" },
    [Activity.GRAVEL]: { FileName: 'activities/gravel.png', ActivityName: "Gravelbiking" },
    [Activity.BIKEPACKING]: { FileName: 'activities/bikepacking.png', ActivityName: "Bike Packing" },
    [Activity.SKITOURING]: { FileName: 'activities/ski-touring.png', ActivityName: "Ski Touring" },
  };

  selectedActivitiesFlag: number = Activity.UNDEFINED;

  private onChange!: Function;
  private onTouched!: Function;

  clickIcon(activity: Activity) {
    if (activity === Activity.UNDEFINED) {
      this.selectedActivitiesFlag = Activity.UNDEFINED;
      return;
    }
    this.selectedActivitiesFlag ^= 1 << activity;
    this.onChange(this.selectedActivitiesFlag);
  }

  isIconSelected(activity: Activity) {
    if (activity === Activity.UNDEFINED) {
      return this.selectedActivitiesFlag === Activity.UNDEFINED;
    }
    return (this.selectedActivitiesFlag & (1 << activity)) > 0;
  }

  getGreyIcon(iconName: string): string {
    return iconName.replace(".png", "_grey.png"
    );
  }

  writeValue(activitiesFlag: number | null): void {
    this.selectedActivitiesFlag = activitiesFlag ?? Activity.UNDEFINED;
  }

  registerOnChange(fn: Function): void {
    this.onChange = (activitiesFlag: number) => { fn(activitiesFlag); };
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
