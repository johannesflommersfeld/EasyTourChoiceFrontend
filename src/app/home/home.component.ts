import { Component, OnInit } from '@angular/core';
import { ActivitySelectorComponent } from "./activity-selector/activity-selector.component";
import { Activity } from '../models/tour-data/activity.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneralDifficulty } from '../models/tour-data/general-difficulty.model';
import { RiskLevel } from '../models/tour-data/risk-level.model';
import { Aspect } from '../models/tour-data/aspect.model';
import { Router } from '@angular/router';
import { AspectPickerComponent } from '../tour-form/aspect-picker/aspect-picker.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
  selector: 'etc-home',
  imports: [ReactiveFormsModule, ActivitySelectorComponent, AspectPickerComponent, NgxSliderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  filtersForm = new FormGroup({
    activitiesFlag: new FormControl<number>(Activity.UNDEFINED),
    minDistance: new FormControl<number>(0),
    maxDistance: new FormControl<number>(Infinity),
    minDuration: new FormControl<number>(0),
    maxDuration: new FormControl<number>(Infinity),
    minMetersOfElevation: new FormControl<number>(0),
    maxMetersOfElevation: new FormControl<number>(Infinity),
    minDifficulty: new FormControl<GeneralDifficulty>(GeneralDifficulty.EASY),
    maxDifficulty: new FormControl<GeneralDifficulty>(GeneralDifficulty.VERY_CHALLENGING),
    minRisk: new FormControl<RiskLevel>(RiskLevel.VERY_SAFE),
    maxRisk: new FormControl<RiskLevel>(RiskLevel.DANGEROUS),
    minTravelDistance: new FormControl<number>(0),
    maxTravelDistance: new FormControl<number>(Infinity),
    minTravelDuration: new FormControl<number>(0),
    maxTravelDuration: new FormControl<number>(Infinity),
    aspects: new FormControl<Aspect>(Aspect.UNKNOWN),
  });


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  searchTours(): void {
    const formValues = this.filtersForm.value;
    this.router.navigate(['/tour-catalog'], {
      queryParams: {
        activities: formValues.activitiesFlag || Activity.UNDEFINED,
        minDistance: formValues.minDistance || 0,
        maxDistance: formValues.maxDistance || Infinity,
        minDuration: formValues.minDuration || 0,
        maxDuration: formValues.maxDuration || Infinity,
        minMetersOfElevation: formValues.minMetersOfElevation || 0,
        maxMetersOfElevation: formValues.maxMetersOfElevation || Infinity,
        minDifficulty: formValues.minDifficulty || GeneralDifficulty.EASY,
        maxDifficulty: formValues.maxDifficulty || GeneralDifficulty.VERY_CHALLENGING,
        minRisk: formValues.minRisk || RiskLevel.VERY_SAFE,
        maxRisk: formValues.maxRisk || RiskLevel.DANGEROUS,
        minTravelDistance: formValues.minTravelDistance || 0,
        maxTravelDistance: formValues.maxTravelDistance || Infinity,
        minTravelDuration: formValues.minTravelDuration || 0,
        maxTravelDuration: formValues.maxTravelDuration || Infinity,
        aspects: formValues.aspects || Aspect.UNKNOWN,
      }, queryParamsHandling: 'merge'
    });
  }
}
