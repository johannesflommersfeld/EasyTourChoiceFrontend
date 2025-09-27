import { Component, signal } from '@angular/core';
import { Activity } from '../../lib/domain/tour-data/activity';
import { ActivitySelectorComponent } from '../../lib/ui/activity-selector/activity-selector';

@Component({
  selector: 'app-home-signals',
  imports: [ActivitySelectorComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  protected readonly activitiesOrdered = signal<Activity[]>([
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
  ]);

  protected readonly activityIconNames = signal<Record<Activity, { FileName: string, ActivityName: string }>>({
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
  });

  protected selectedActivitiesFlag = signal(Activity.UNDEFINED);

  onActivitiesChange(flag: number) {
    this.selectedActivitiesFlag.set(flag);
    console.log('Selected activities flag:', flag);
  }
}