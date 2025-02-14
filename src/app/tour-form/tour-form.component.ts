import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ITour } from '../models/tour-data/tour.model';
import { RiskLevel } from '../models/tour-data/risk-level.model';
import { Activity } from '../models/tour-data/activity.model';
import { GeneralDifficulty } from '../models/tour-data/general-difficulty.model';
import { ToursService } from '../tours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'etc-tour-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tour-form.component.html',
  styleUrl: './tour-form.component.css'
})
export class TourFormComponent {
  tourForm = new FormGroup({
    activity: new FormControl<Activity>(Activity.UNDEFINED),
    tourName: new FormControl<string>(''),
    shortDescription: new FormControl<string>(''),
    detailedDescription: new FormControl<string>(''),
    distance: new FormControl(),
    duration: new FormControl(),
    approachDuration: new FormControl(),
    elevationGain: new FormControl(),
    risk: new FormControl(RiskLevel.MODERATE_RISK),
    difficulty: new FormControl(GeneralDifficulty.MILDLY_CHALLENGING),
    aspects: new FormControl(),
    startingLocation: new FormControl(),
    activtyLocation: new FormControl(),
    gpsTrack: new FormControl(),
  });

  constructor(
    private router: Router,
    private toursSvc: ToursService,
  ) { }

  saveTour(): void {
    console.log(this.tourForm.value);
    const tour: Partial<ITour> = this.tourForm.value;
    this.toursSvc.putTour(tour).subscribe({
      next: () => this.router.navigate(['/home'])
    });
  }
}
