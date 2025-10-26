import { 
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  WritableSignal
} from '@angular/core';
import {
  form, 
  required, 
  submit,
  Control,
} from '@angular/forms/signals';
import { ITour, ITourWithLocations } from '../../lib/domain/tour-data/tour';
import { ToursService } from '../services/tours';
import { Activity } from '../../lib/domain/tour-data/activity';
import { GeneralDifficulty } from '../../lib/domain/tour-data/general-difficulty';
import { RiskLevel } from '../../lib/domain/tour-data/risk-level';
import { Aspect } from '../../lib/domain/tour-data/aspect';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ActivitiesOrdered } from '../utils/activites';
import { RiskPipe, DifficultyPipe, ActivityPipe } from '../../lib/utils/pipes';
import { GPSLocation } from '../../lib/domain/tour-data/gps-location';
import { LocationFormComponent } from './location-form/location-form';
import { AspectIndicatorComponent } from '../../lib/ui/aspect-indicator/aspect-indicator';
import { MapComponent } from '../../lib/ui/map/map';
import { InteractiveMarkersDirective } from '../../lib/ui/map/interactive-markers';
import { InteractiveSelectionDirective } from '../../lib/ui/aspect-indicator/interactive-selection';

@Component({
  selector: 'app-tour-form',
  imports: [
    Control,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RiskPipe,
    DifficultyPipe,
    ActivityPipe,
    LocationFormComponent,
    AspectIndicatorComponent,
    MapComponent,
    InteractiveMarkersDirective,
    MatIconModule,
    InteractiveSelectionDirective
  ],
  templateUrl: './tour-form.html',
  styleUrl: './tour-form.scss'
})
export class TourFormComponent {
  private router = inject(Router);
  private readonly tourService = inject(ToursService);

  protected readonly tourId = input<number>();
  protected readonly availableActivities = ActivitiesOrdered;
  protected readonly riskValues = Object.values(RiskLevel).filter(value => typeof value === 'number');;
  protected readonly difficultyValues = Object.values(GeneralDifficulty).filter(value => typeof value === 'number');;

  private readonly tourResource = this.tourService.createSingleTourResource(this.tourId);

  protected readonly receivedTour = computed(() => {
    if (!this.tourResource?.hasValue()) {
      return undefined;
    }
    const tour: ITour = this.tourResource.value();
    const tourWithLocations: ITourWithLocations = {
        ...tour,
        startingLocation: tour.startingLocation ?? new GPSLocation(null, null),
        activityLocation: tour.activityLocation ?? new GPSLocation(null, null),
        aspect: tour.aspect ?? Aspect.UNKNOWN
    };
    return tourWithLocations;
  });

  protected readonly tour: WritableSignal<ITourWithLocations> = signal({
    name: "",
    shortDescription: null,
    activityType: Activity.UNDEFINED,
    duration: null,
    distance: null,
    metersOfElevation: null,
    approachDuration: null,
    difficulty: GeneralDifficulty.UNKNOWN,
    risk: RiskLevel.UNKNOWN,
    aspect: Aspect.UNKNOWN,
    startingLocation: new GPSLocation(null, null),
    activityLocation: new GPSLocation(null, null),
    // TODO: create TourCreate class to not have to initialize those fields
    id: 0,
    travelDetails: null,
    bulletin: null,
    weatherForecast: null,
    startingLocationId: 0,
    activityLocationId: 0,
    areaId: null,
    avalancheRegionID: null,
  });

  tourForm = form(this.tour, (tour) => {
    required(tour.name);
    required(tour.shortDescription);
    required(tour.activityType);
    required(tour.duration);
    required(tour.distance);
    required(tour.metersOfElevation);
  });

  constructor() {
    effect(() => {
      const tour = this.receivedTour();
      if (!tour) return;
      this.tour.set(tour)}
    );
  }

  async save() {
    console.log('Form valid:', this.tourForm().valid());
    const result = await submit(this.tourForm, async (form) => {
      const tourToSave: ITour = form().value();

      // set invalid locations to null to create valid tour
      if (!tourToSave.startingLocation?.latitude || !tourToSave.startingLocation?.longitude) { 
        tourToSave.startingLocation = null;
      }
      if (!tourToSave.activityLocation?.latitude || !tourToSave.activityLocation?.longitude) { 
        tourToSave.activityLocation = null;
      }

      const receivedTour = this.receivedTour();
      const response = receivedTour 
        ? this.tourService.patchTour(this.tour().id, tourToSave, receivedTour)
        : this.tourService.putTour(tourToSave);
      await lastValueFrom(response);
    });

    if (result === undefined && this.tourForm().valid()) {
      this.router.navigate(['/tour-details', this.tour().id]);
    } else {
      console.log('Invalid tour.');
    }
  }

  cancel(): void {
    if (this.tourId()) {
      this.router.navigate(['/tour-details', this.tourId()]);
    } else {
      this.router.navigate(['/tour-catalog']);
    }
  }

  protected updateStartingLocation(location: GPSLocation) {
    this.tour.update(currentTour => ({
      ...currentTour,
      startingLocation: location
    }));
  }

  protected updateActivityLocation(location: GPSLocation) {
    this.tour.update(currentTour => ({
      ...currentTour,
      activityLocation: location
    }));
  }
}