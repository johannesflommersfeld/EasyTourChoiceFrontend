import { Component, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Activity } from '../../lib/domain/tour-data/activity';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';
import { ActivitySelectorComponent } from '../../lib/ui/activity-selector/activity-selector';
import { Filters } from '../../lib/ui/filters/filters';
import { Router } from '@angular/router';
import { ActivitiesOrdered, ActivityIconNames } from '../utils/activites';
import { DefaultFilters } from '../utils/filters';

@Component({
  selector: 'app-home-signals',
  imports: [ActivitySelectorComponent, Filters, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private router = inject(Router);

  protected filters: FilterValues = DefaultFilters

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
    this.router.navigate(['/tour-catalog'], { state: { filters: this.filters, activities: HomeComponent.flagToActivities(this.selectedActivitiesFlag())} });
  }

  private static flagToActivities(flag: number): Activity[] {
    if (flag == Activity.UNDEFINED) {
      return [Activity.UNDEFINED]
    }

    const activities: Activity[] = []
    for (const activity of ActivitiesOrdered) {
      if (flag == Activity.UNDEFINED) continue;

      if (flag & (1 << activity))
      {
        activities.push(activity);
      }
    }
    return activities;
  }
}