import { Component, computed, effect, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import {
  form, 
  required, 
  submit,
  Field, 
} from '@angular/forms/signals';
import { ITour } from '../../lib/domain/tour-data/tour';
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
@Component({
  selector: 'app-tour-form',
  imports: [Field, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './tour-form.html',
  styleUrl: './tour-form.scss'
})
export class TourFormComponent {
  private router = inject(Router);
  private readonly tourService = inject(ToursService);

  protected readonly tourId = input<string>();
  private readonly tourResource = this.tourService.createSingleTourResource(this.tourId);
  
  protected readonly receivedTour = computed(() => {
    if (!this.tourResource?.hasValue()) {
      return undefined;
    }
    return this.tourResource.value();
  });

  protected readonly tour: WritableSignal<ITour> = signal({
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
    startingLocation: null,
    activityLocation: null,
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
    required(tour.approachDuration);
    required(tour.difficulty);
    required(tour.risk);
    required(tour.aspect);
    required(tour.startingLocation);
    required(tour.activityLocation);
  });

  constructor() {
    effect(() => {
      const tour = this.receivedTour();
      if (!tour) return;
      this.tour.set(tour)}
    );
  }

  save() {
    submit(this.tourForm, async (form) => {
      const tour = this.tourService.putTour(form().value());
      this.tour.set(await lastValueFrom(tour));
      this.router.navigate(['/tour-details', this.tour().id]);
    });
  }

  cancel(): void {
    if (this.tourId()) {
      this.router.navigate(['/tour-details', this.tourId()]);
    } else {
      this.router.navigate(['/tour-catalog']);
    }
  }
}