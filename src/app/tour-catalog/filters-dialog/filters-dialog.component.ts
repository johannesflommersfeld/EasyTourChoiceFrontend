import { AfterViewInit, Component, Inject, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
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
import { Filters } from '../tour-catalog.component';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  imports: [ReactiveFormsModule, DoubleSliderComponent, AspectPickerComponent, MatDialogContent, MatDialogActions, MatButtonModule],
  styleUrls: ['./filters-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersDialogComponent implements AfterViewInit {
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

  filtersForm: FormGroup;

  @ViewChildren(DoubleSliderComponent) sliders!: QueryList<DoubleSliderComponent<Number>>;


  constructor(
    public dialogRef: MatDialogRef<FiltersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filters: Filters }) {
    this.filtersForm = new FormGroup({
      activitiesFlag: new FormControl<number>(this.data.filters.activitiesFlag ?? Activity.UNDEFINED),
      distanceRange: new FormControl<DoubleSliderValue<number>>({ lowValue: this.data.filters.minDistance ?? 0, highValue: this.data.filters.maxDistance ?? 300 }),
      durationRange: new FormControl<DoubleSliderValue<number>>({ lowValue: this.data.filters.minDuration ?? 0, highValue: this.data.filters.maxDuration ?? 12 }),
      metersOfElevationRange: new FormControl<DoubleSliderValue<number>>({ lowValue: this.data.filters.minMetersOfElevation ?? 0, highValue: this.data.filters.maxMetersOfElevation ?? 2000 }),
      difficultyRange: new FormControl<DoubleSliderValue<GeneralDifficulty>>({ lowValue: this.data.filters.minDifficulty ?? GeneralDifficulty.UNKNOWN, highValue: this.data.filters.maxDifficulty ?? GeneralDifficulty.VERY_CHALLENGING }),
      riskRange: new FormControl<DoubleSliderValue<RiskLevel>>({ lowValue: this.data.filters.minRisk ?? RiskLevel.UNKNOWN, highValue: this.data.filters.maxRisk ?? RiskLevel.DANGEROUS }),
      travelDistanceRange: new FormControl<DoubleSliderValue<number>>({ lowValue: this.data.filters.minTravelDistance ?? 0, highValue: this.data.filters.maxTravelDistance ?? 1000 }),
      travelDurationRange: new FormControl<DoubleSliderValue<number>>({ lowValue: this.data.filters.minTravelDuration ?? 0, highValue: this.data.filters.maxTravelDuration ?? 24 }),
      aspects: new FormControl<Aspect>(this.data.filters.aspects ?? (
        Aspect.NORTH
        | Aspect.NORTH_EAST
        | Aspect.EAST
        | Aspect.SOUTH_EAST
        | Aspect.SOUTH
        | Aspect.SOUTH_WEST
        | Aspect.WEST
        | Aspect.NORTH_WEST
      )),
    });
  }

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sliders.forEach(slider => slider.refreshSlider());
    }, 0);
  }

  onApply(): void {
    const formValues = this.filtersForm.value;
    const filters: Filters = {
      activitiesFlag: formValues.activitiesFlag,
      minDistance: formValues.distanceRange.lowValue,
      maxDistance: formValues.distanceRange.highValue,
      minDuration: formValues.durationRange.lowValue,
      maxDuration: formValues.durationRange.highValue,
      minMetersOfElevation: formValues.metersOfElevationRange.lowValue,
      maxMetersOfElevation: formValues.metersOfElevationRange.highValue,
      minDifficulty: formValues.difficultyRange.lowValue,
      maxDifficulty: formValues.difficultyRange.highValue,
      minRisk: formValues.riskRange.lowValue,
      maxRisk: formValues.riskRange.highValue,
      minTravelDistance: formValues.travelDistanceRange.lowValue,
      maxTravelDistance: formValues.travelDistanceRange.highValue,
      minTravelDuration: formValues.travelDurationRange.lowValue,
      maxTravelDuration: formValues.travelDurationRange.highValue,
      aspects: formValues.aspects,
    };

    this.dialogRef.close(filters);
  }
}
