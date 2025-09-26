import { Component, forwardRef, Provider, computed, effect, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Activity } from '../../domain/tour-data/activity';


const ACTIVITY_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ActivitySelectorComponent),
  multi: true,
}

@Component({
  selector: 'app-activity-selector',
  imports: [MatTooltipModule],
  templateUrl: './activity-selector.html',
  styleUrl: './activity-selector.scss',
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

  selectedActivitiesFlag = signal(Activity.UNDEFINED);

  private onChange!: (activitiesFlag: number) => void;
  private onTouched!: () => void;

  clickIcon(activity: Activity) {
    if (activity === Activity.UNDEFINED) {
      this.selectedActivitiesFlag.set(Activity.UNDEFINED);
      return;
    }
    const currentFlag = this.selectedActivitiesFlag();
    this.selectedActivitiesFlag.set(currentFlag ^ (1 << activity));
    this.onChange(this.selectedActivitiesFlag());
  }

  isIconSelected(activity: Activity) {
    if (activity === Activity.UNDEFINED) {
      return this.selectedActivitiesFlag() === Activity.UNDEFINED;
    }
    return (this.selectedActivitiesFlag() & (1 << activity)) > 0;
  }

  getGreyIcon(iconName: string): string {
    return iconName.replace(".png", "_grey.png"
    );
  }

  writeValue(activitiesFlag: number | null): void {
    this.selectedActivitiesFlag.set(activitiesFlag ?? Activity.UNDEFINED);
  }

  registerOnChange(fn: (activitiesFlag: number) => void): void {
    this.onChange = fn;
    effect(() => {
      fn(this.selectedActivitiesFlag());
    });
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}