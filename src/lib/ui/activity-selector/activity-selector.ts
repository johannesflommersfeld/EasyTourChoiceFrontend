import { Component, input, output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Activity } from '../../domain/tour-data/activity';

@Component({
  selector: 'app-activity-selector',
  imports: [MatTooltipModule],
  templateUrl: './activity-selector.html',
  styleUrl: './activity-selector.scss'
})
export class ActivitySelectorComponent {
  readonly activitiesOrdered = input.required<Activity[]>();
  readonly activityIconNames = input.required<Record<Activity, { FileName: string, ActivityName: string }>>();

  readonly value = input(Activity.UNDEFINED);
  protected readonly valueChange = output<number>();
  
  protected onActivityClick(activity: Activity) {
    let newValue: number;
    if (activity === Activity.UNDEFINED) {
      newValue = Activity.UNDEFINED;
    } else {
      const currentFlag = this.value();
      newValue = currentFlag ^ (1 << activity);
    }
    this.valueChange.emit(newValue);
  }
  
  protected isIconSelected(activity: Activity) {
    if (activity === Activity.UNDEFINED) {
      return this.value() === Activity.UNDEFINED;
    }
    return (this.value() & (1 << activity)) > 0;
  }
  
  protected getGreyIcon(iconName: string): string {
    return iconName.replace(".png", "_grey.png");
  }
}