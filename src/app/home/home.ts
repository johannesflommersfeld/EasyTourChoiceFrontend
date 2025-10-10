import { Component, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Activity } from '../../lib/domain/tour-data/activity';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';
import { Aspect } from '../../lib/domain/tour-data/aspect';
import { ActivitySelectorComponent } from '../../lib/ui/activity-selector/activity-selector';
import { Filters, FilterLimits } from '../../lib/ui/filters/filters';
import { Router } from '@angular/router';
import { ActivitiesOrdered, ActivityIconNames } from '../utils/activites';

@Component({
  selector: 'app-home-signals',
  imports: [ActivitySelectorComponent, Filters, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private router = inject(Router);

  protected filters: FilterValues = {
    distance: { min: FilterLimits.lowerLimitDistance, max: FilterLimits.upperLimitDistance },
    duration: { min: FilterLimits.lowerLimitDuration, max: FilterLimits.upperLimitDuration },
    elevation: { min: FilterLimits.lowerLimitElevation, max: FilterLimits.upperLimitElevation },
    risk: { min: FilterLimits.lowerLimitRisk, max: FilterLimits.upperLimitRisk },
    difficulty: { min: FilterLimits.lowerLimitDifficulty, max: FilterLimits.upperLimitDifficulty },
    travelDistance: { min: FilterLimits.lowerLimitTravelDistance, max: FilterLimits.upperLimitTravelDistance },
    travelDuration: { min: FilterLimits.lowerLimitTravelDuration, max: FilterLimits.upperLimitTravelDuration },
    aspects: 0b1111_1111 as Aspect,
  };

  protected readonly activitiesOrdered: Activity[] = ActivitiesOrdered;
  protected readonly activityIconNames: Record<Activity, { FileName: string, ActivityName: string }> = ActivityIconNames;

  protected selectedActivitiesFlag = signal(Activity.UNDEFINED);

  protected onActivitiesChange(flag: number) {
    this.selectedActivitiesFlag.set(flag);
  }

  protected onFiltersChanged(filters: FilterValues): void {
    this.filters = filters;
  }

  protected searchTours(): void {
    if (this.filters) {
      this.router.navigate(['/tour-catalog'], { state: { filters: this.filters, activities: HomeComponent.flagToActivities(this.selectedActivitiesFlag())} });
    } else {
      this.router.navigate(['/tour-catalog']);
    }
  }

  private static flagToActivities(flag: number): Activity[] {
    if (flag == Activity.UNDEFINED) {
      return [Activity.UNDEFINED]
    }

    let activites: Activity[] = []
    for (let activity of ActivitiesOrdered) {
      if (flag == Activity.UNDEFINED) continue;

      if (flag & (1 << activity))
      {
        activites.push(activity);
      }
    }
    return activites;
  }
}