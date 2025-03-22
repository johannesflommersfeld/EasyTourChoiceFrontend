import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ITour } from '../models/tour-data/tour.model';
import { RiskLevel } from '../models/tour-data/risk-level.model';
import { Activity } from '../models/tour-data/activity.model';
import { GeneralDifficulty } from '../models/tour-data/general-difficulty.model';
import { ToursService } from '../tours.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GPSLocation } from '../models/tour-data/gps-location.model';

@Component({
  selector: 'etc-tour-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tour-form.component.html',
  styleUrl: './tour-form.component.css'
})
export class TourFormComponent implements OnInit {
  // Expose enums to the template
  Activity = Activity;
  RiskLevel = RiskLevel;
  GeneralDifficulty = GeneralDifficulty;

  // Calculate min and max values from enums
  riskLevelMin = Math.min(...Object.keys(RiskLevel).filter(k => !isNaN(Number(k))).map(Number));
  riskLevelMax = Math.max(...Object.keys(RiskLevel).filter(k => !isNaN(Number(k))).map(Number));

  difficultyMin = Math.min(...Object.keys(GeneralDifficulty).filter(k => !isNaN(Number(k))).map(Number));
  difficultyMax = Math.max(...Object.keys(GeneralDifficulty).filter(k => !isNaN(Number(k))).map(Number));

  // Text display for enum values
  riskLevelText: string = '';
  difficultyLevelText: string = '';

  tourForm = new FormGroup({
    activity: new FormControl<Activity>(Activity.UNDEFINED),
    tourName: new FormControl<string>(''),
    shortDescription: new FormControl<string>(''),
    detailedDescription: new FormControl<string>(''),
    distance: new FormControl<number | null>(null),
    duration: new FormControl<number | null>(null),
    approachDuration: new FormControl<number | null>(null),
    elevationGain: new FormControl<number | null>(null),
    risk: new FormControl<RiskLevel>(RiskLevel.UNKNOWN),
    difficulty: new FormControl<GeneralDifficulty>(GeneralDifficulty.UNKNOWN),
    aspects: new FormControl<string>(''),
    // Using string to store location data temporarily
    startingLocationLat: new FormControl<number | null>(null),
    startingLocationLng: new FormControl<number | null>(null),
    activityLocationLat: new FormControl<number | null>(null),
    activityLocationLng: new FormControl<number | null>(null),
    gpsTrack: new FormControl<string>(''),
  });

  constructor(
    private router: Router,
    private toursSvc: ToursService,
  ) { }

  ngOnInit() {
    // Initialize text displays
    this.updateRiskText();
    this.updateDifficultyText();
  }

  updateRiskText(): void {
    const riskValue = this.tourForm.get('risk')?.value as RiskLevel;

    switch (riskValue) {
      case RiskLevel.UNKNOWN:
        this.riskLevelText = 'Unknown';
        break;
      case RiskLevel.VERY_SAFE:
        this.riskLevelText = 'Very Safe';
        break;
      case RiskLevel.SAFE:
        this.riskLevelText = 'Safe';
        break;
      case RiskLevel.MODERATE_RISK:
        this.riskLevelText = 'Moderate Risk';
        break;
      case RiskLevel.HIGH_RISK:
        this.riskLevelText = 'High Risk';
        break;
      case RiskLevel.DANGEROUS:
        this.riskLevelText = 'Dangerous';
        break;
      default:
        this.riskLevelText = 'Unknown';
    }
  }

  updateDifficultyText(): void {
    const difficultyValue = this.tourForm.get('difficulty')?.value as GeneralDifficulty;

    switch (difficultyValue) {
      case GeneralDifficulty.UNKNOWN:
        this.difficultyLevelText = 'Unknown';
        break;
      case GeneralDifficulty.EASY:
        this.difficultyLevelText = 'Easy';
        break;
      case GeneralDifficulty.MILDLY_CHALLENGING:
        this.difficultyLevelText = 'Mildly Challenging';
        break;
      case GeneralDifficulty.CHALLENGING:
        this.difficultyLevelText = 'Challenging';
        break;
      case GeneralDifficulty.VERY_CHALLENING:
        this.difficultyLevelText = 'Very Challenging';
        break;
      default:
        this.difficultyLevelText = 'Unknown';
    }
  }

  saveTour(): void {
    const formValues = this.tourForm.value;

    let startingLocation: GPSLocation | null = null;
    let activityLocation: GPSLocation | null = null;

    if (formValues.startingLocationLat && formValues.startingLocationLng) {
      startingLocation = new GPSLocation(
        formValues.startingLocationLat,
        formValues.startingLocationLng
      );
    }

    if (formValues.activityLocationLat && formValues.activityLocationLng) {
      activityLocation = new GPSLocation(
        formValues.activityLocationLat,
        formValues.activityLocationLng
      );
    }

    const tour: Partial<ITour> = {
      name: formValues.tourName || '',
      activityType: formValues.activity || Activity.UNDEFINED,
      shortDescription: formValues.shortDescription || null,
      distance: formValues.distance,
      duration: formValues.duration,
      approachDuration: formValues.approachDuration,
      metersOfElevation: formValues.elevationGain,
      risk: formValues.risk || RiskLevel.UNKNOWN,
      difficulty: formValues.difficulty || GeneralDifficulty.UNKNOWN,
      startingLocation: startingLocation,
      activityLocation: activityLocation,
      // These will be set on the server
      id: 0,
      startingLocationId: 0,
      activityLocationId: 0,
      areaId: 0,
      weatherForecast: null,
      bulletin: null,
      travelDetails: null
    };

    console.log('Submitting tour:', tour);

    this.toursSvc.putTour(tour).subscribe({
      next: () => this.router.navigate(['/home'])
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
