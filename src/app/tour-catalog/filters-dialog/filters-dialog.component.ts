import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RiskLevel } from '../../models/tour-data/risk-level.model';
import { GeneralDifficulty } from '../../models/tour-data/general-difficulty.model';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Aspect } from '../../models/tour-data/aspect.model';
import { DoubleSliderComponent, DoubleSliderValue } from '../../double-slider/double-slider.component';
import { Activity } from '../../models/tour-data/activity.model';
import { AspectPickerComponent } from '../../tour-form/aspect-picker/aspect-picker.component';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  imports: [ReactiveFormsModule, DoubleSliderComponent, AspectPickerComponent, MatDialogContent, MatDialogActions, MatButtonModule],
  styleUrls: ['./filters-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersDialogComponent {
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
    public dialogRef: MatDialogRef<FiltersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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

  onApply(): void {
    this.dialogRef.close(false);
  }
}