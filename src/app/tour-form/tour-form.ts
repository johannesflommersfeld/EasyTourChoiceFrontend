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
  Field,
} from '@angular/forms/signals';
import { ITour, ITourForm, toTour, toTourForm} from '../../lib/domain/tour-data/tour';
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
import { GPSLocation, IGPSLocationForForm, toLocation } from '../../lib/domain/tour-data/gps-location';
import { LocationFormComponent } from './location-form/location-form';
import { AspectIndicatorComponent } from '../../lib/ui/aspect-indicator/aspect-indicator';
import { MapComponent } from '../../lib/ui/map/map';
import { InteractiveMarkersDirective } from '../../lib/ui/map/interactive-markers';
import { InteractiveSelectionDirective } from '../../lib/ui/aspect-indicator/interactive-selection';

@Component({
  selector: 'app-tour-form',
  imports: [
    Field,
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
    return this.tourResource.value();
  });

  protected readonly tour: WritableSignal<ITourForm> = signal({
    name: "",
    shortDescription: "",
    activityType: Activity.UNDEFINED,
    duration: "",
    distance: "",
    metersOfElevation: "",
    approachDuration: "",
    difficulty: GeneralDifficulty.UNKNOWN,
    risk: RiskLevel.UNKNOWN,
    aspect: Aspect.UNKNOWN,
    startingLocation: {latitude: "", longitude: "", altitude: null, locationId: null, toLocation: toLocation} as IGPSLocationForForm,
    activityLocation: {latitude: "", longitude: "", altitude: null, locationId: null, toLocation: toLocation} as IGPSLocationForForm,
    id: null,
    areaId: null,
    avalancheRegionID: null,
    startingLocationId: null,
    activityLocationId: null,
    toTour: toTour,
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
      tour.toTourForm = toTourForm;
      this.tour.set(tour.toTourForm())}
    );
  }

  async save() {
    console.log('Form valid:', this.tourForm().valid());
    let id = undefined;
    const result = await submit(this.tourForm, async (form) => {
      const tourToSave: ITour = form().value().toTour();

      // set invalid locations to null to create valid tour
      if (!tourToSave.startingLocation?.latitude || !tourToSave.startingLocation?.longitude) { 
        tourToSave.startingLocation = null;
      }
      if (!tourToSave.activityLocation?.latitude || !tourToSave.activityLocation?.longitude) { 
        tourToSave.activityLocation = null;
      }

      const receivedTour = this.receivedTour();
      const response = receivedTour && receivedTour.id
        ? this.tourService.patchTour(receivedTour.id, tourToSave, receivedTour)
        : this.tourService.putTour(tourToSave);
      const tour = await lastValueFrom(response);
      id = tour.id;
    });

    if (result === undefined && this.tourForm().valid()) {
      this.router.navigate(['/tour-details', id]);
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
      startingLocation: {
        ...location,
        latitude: location.latitude ?? "",
        longitude: location.longitude ?? "",
        toLocation: toLocation
      }
    }));
  }

  protected updateActivityLocation(location: GPSLocation) {
    this.tour.update(currentTour => ({
      ...currentTour,
      activityLocation: {
        ...location,
        latitude: location.latitude ?? "",
        longitude: location.longitude ?? "",
        toLocation: toLocation
      }
    }));
  }
}