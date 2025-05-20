import { Component, OnInit } from '@angular/core';
import { ActivitySelectorComponent } from "./activity-selector/activity-selector.component";
import { Activity } from '../models/tour-data/activity.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneralDifficulty } from '../models/tour-data/general-difficulty.model';
import { RiskLevel } from '../models/tour-data/risk-level.model';
import { Aspect } from '../models/tour-data/aspect.model';
import { Router } from '@angular/router';
import { AspectPickerComponent } from '../tour-form/aspect-picker/aspect-picker.component';
import { DoubleSliderComponent, DoubleSliderValue } from "../double-slider/double-slider.component";
import { Options } from '@angular-slider/ngx-slider';
import { Filters } from '../tour-catalog/tour-catalog.component';

@Component({
  selector: 'etc-home',
  imports: [ReactiveFormsModule, ActivitySelectorComponent, AspectPickerComponent, DoubleSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  riskLevelType = RiskLevel;
  riskLevelOptions: Options = { floor: RiskLevel.UNKNOWN, ceil: RiskLevel.DANGEROUS, step: 1, showTicks: false };
  riskLevelTranslator!: (value: number) => string;

  difficultyLevelType = GeneralDifficulty;
  difficultyLevelOptions: Options = { floor: GeneralDifficulty.UNKNOWN, ceil: GeneralDifficulty.VERY_CHALLENGING, step: 1, showTicks: false };
  difficultyLevelTranslator!: (value: number) => string;

  distanceOptions: Options = { floor: 0, ceil: 300, step: 0.1, showTicks: false };
  distanceTranslator!: (value: number) => string;

  metersOfElevationOptions: Options = { floor: 0, ceil: 2000, step: 1, showTicks: false };
  metersOfElevationTranslator!: (value: number) => string;

  durationOptions: Options = { floor: 0, ceil: 12, step: 0.5, showTicks: false };
  durationTranslator!: (value: number) => string;

  travelDistanceOptions: Options = { floor: 0, ceil: 1000, step: 1, showTicks: false };
  travelDistanceTranslator!: (value: number) => string;

  travelDurationOptions: Options = { floor: 0, ceil: 24, step: 0.5, showTicks: false };
  travelDurationTranslator!: (value: number) => string;

  filtersForm = new FormGroup({
    activitiesFlag: new FormControl<number>(Activity.UNDEFINED),
    distanceRange: new FormControl<DoubleSliderValue<number>>({ lowValue: 0, highValue: 300 }),
    durationRange: new FormControl<DoubleSliderValue<number>>({ lowValue: 0, highValue: 12 }),
    metersOfElevationRange: new FormControl<DoubleSliderValue<number>>({ lowValue: 0, highValue: 2000 }),
    maxMetersOfElevation: new FormControl<number>(Infinity),
    difficultyRange: new FormControl<DoubleSliderValue<GeneralDifficulty>>({ lowValue: GeneralDifficulty.UNKNOWN, highValue: GeneralDifficulty.VERY_CHALLENGING }),
    riskRange: new FormControl<DoubleSliderValue<RiskLevel>>({ lowValue: RiskLevel.UNKNOWN, highValue: RiskLevel.DANGEROUS }),
    travelDistanceRange: new FormControl<DoubleSliderValue<number>>({ lowValue: 0, highValue: 1000 }),
    travelDurationRange: new FormControl<DoubleSliderValue<number>>({ lowValue: 0, highValue: 24 }),
    aspects: new FormControl<Aspect>(
      Aspect.NORTH
      | Aspect.NORTH_EAST
      | Aspect.EAST
      | Aspect.SOUTH_EAST
      | Aspect.SOUTH
      | Aspect.SOUTH_WEST
      | Aspect.WEST
      | Aspect.NORTH_WEST
    ),
  });


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.riskLevelTranslator = (value: number) => {
      const enumValues = Object.values(this.riskLevelType);

      const index = Math.round(value);  // Round to match the enum keys
      return String(enumValues[index]) || 'Unknown';  // Return the enum key or a default label
    };

    this.difficultyLevelTranslator = (value: number) => {
      const enumValues = Object.values(this.difficultyLevelType);

      const index = Math.round(value);  // Round to match the enum keys
      return String(enumValues[index]) || 'Unknown';  // Return the enum key or a default label
    };
  }

  searchTours(): void {
    const formValues = this.filtersForm.value;
    const filters: Filters = {
      activitiesFlag: formValues.activitiesFlag || Activity.UNDEFINED,
      minDistance: formValues.distanceRange?.lowValue || 0,
      maxDistance: formValues.distanceRange?.highValue || Infinity,
      minDuration: formValues.durationRange?.lowValue || 0,
      maxDuration: formValues.durationRange?.highValue || Infinity,
      minMetersOfElevation: formValues.metersOfElevationRange?.lowValue || 0,
      maxMetersOfElevation: formValues.metersOfElevationRange?.highValue || Infinity,
      minDifficulty: formValues.difficultyRange?.lowValue || GeneralDifficulty.EASY,
      maxDifficulty: formValues.difficultyRange?.highValue || GeneralDifficulty.VERY_CHALLENGING,
      minRisk: formValues.riskRange?.lowValue || RiskLevel.VERY_SAFE,
      maxRisk: formValues.riskRange?.highValue || RiskLevel.DANGEROUS,
      minTravelDistance: formValues.travelDistanceRange?.lowValue || 0,
      maxTravelDistance: formValues.travelDistanceRange?.highValue || Infinity,
      minTravelDuration: formValues.travelDurationRange?.lowValue || 0,
      maxTravelDuration: formValues.travelDurationRange?.highValue || Infinity,
      aspects: formValues.aspects || Aspect.UNKNOWN,
    };
    this.router.navigate(['/tour-catalog'], { state: { filters } });
  }
}
