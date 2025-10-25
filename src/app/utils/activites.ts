import { Activity } from "../../lib/domain/tour-data/activity";
import { ActivityPipe } from './pipes';

export const ActivitiesOrdered: Activity[] = [
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

export const ActivityIconNames: Record<Activity, { FileName: string, ActivityName: string }> = {
  [Activity.UNDEFINED]: { FileName: 'activities/undefined.png', ActivityName: ActivityPipe.transform(Activity.UNDEFINED) },
  [Activity.HIKING]: { FileName: 'activities/hiking.png', ActivityName: ActivityPipe.transform(Activity.HIKING) },
  [Activity.TREKKING]: { FileName: 'activities/trekking.png', ActivityName: ActivityPipe.transform(Activity.TREKKING) },
  [Activity.BOULDERING]: { FileName: 'activities/bouldering.png', ActivityName: ActivityPipe.transform(Activity.BOULDERING) },
  [Activity.SPORTCLIMBING]: { FileName: 'activities/sport-climbing.png', ActivityName: ActivityPipe.transform(Activity.SPORTCLIMBING) },
  [Activity.MULTIPITCHCLIMBING]: { FileName: 'activities/multi-pitch-climbing.png', ActivityName: ActivityPipe.transform(Activity.MULTIPITCHCLIMBING) },
  [Activity.VIA_VERRATA]: { FileName: 'activities/via-verrata.png', ActivityName: ActivityPipe.transform(Activity.VIA_VERRATA) },
  [Activity.MOUNTAINBIKING]: { FileName: 'activities/mtb.png', ActivityName: ActivityPipe.transform(Activity.MOUNTAINBIKING) },
  [Activity.ROADCYCLING]: { FileName: 'activities/roadcycling.png', ActivityName: ActivityPipe.transform(Activity.ROADCYCLING) },
  [Activity.GRAVEL]: { FileName: 'activities/gravel.png', ActivityName: ActivityPipe.transform(Activity.GRAVEL) },
  [Activity.BIKEPACKING]: { FileName: 'activities/bikepacking.png', ActivityName: ActivityPipe.transform(Activity.BIKEPACKING) },
  [Activity.SKITOURING]: { FileName: 'activities/ski-touring.png', ActivityName: ActivityPipe.transform(Activity.SKITOURING) },
};