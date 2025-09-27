import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Activity } from '../../lib/domain/tour-data/activity';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';
import { ActivitySelectorComponent } from '../../lib/ui/activity-selector/activity-selector';
import { Filters} from '../../lib/ui/filters/filters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-signals',
  imports: [ActivitySelectorComponent, Filters, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  protected readonly activitiesOrdered: Activity[] = [
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

  protected readonly activityIconNames: Record<Activity, { FileName: string, ActivityName: string }> ={
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

  protected selectedActivitiesFlag = signal(Activity.UNDEFINED);

  private filters: FilterValues | undefined;

  constructor(
    private router: Router
  ) { }

  onActivitiesChange(flag: number) {
    this.selectedActivitiesFlag.set(flag);
  }

  onFiltersChanged(filters: FilterValues): void {
    this.filters = filters;
  }

  searchTours(): void {
    if (this.filters) {
      this.router.navigate(['/tour-catalog'], { state: { filters: this.filters } });
    } else {
      this.router.navigate(['/tour-catalog']);
    }
  }
}