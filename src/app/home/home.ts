import { Component, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Activity } from '../../lib/domain/tour-data/activity';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';
import { Aspect } from '../../lib/domain/tour-data/aspect';
import { ActivitySelectorComponent } from '../../lib/ui/activity-selector/activity-selector';
import { Filters, FilterLimits } from '../../lib/ui/filters/filters';
import { Router } from '@angular/router';

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

  protected onActivitiesChange(flag: number) {
    this.selectedActivitiesFlag.set(flag);
  }

  protected onFiltersChanged(filters: FilterValues): void {
    this.filters = filters;
  }

  protected searchTours(): void {
    if (this.filters) {
      this.router.navigate(['/tour-catalog'], { state: { filters: this.filters } });
    } else {
      this.router.navigate(['/tour-catalog']);
    }
  }
}