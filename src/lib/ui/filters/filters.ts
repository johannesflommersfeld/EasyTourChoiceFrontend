import { Component, input, OnInit, output } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { RiskLevel } from '../../domain/tour-data/risk-level';
import { GeneralDifficulty } from '../../domain/tour-data/general-difficulty';
import { DifficultyRangeValue, FilterValues, RangeValue, RiskRangeValue } from '../../domain/tour-data/filter-values';
import { AspectIndicatorComponent } from '../aspect-indicator/aspect-indicator';
import { Aspect } from '../../domain/tour-data/aspect';

export class FilterLimits {
  static readonly lowerLimitDistance: number = 0;
  static readonly upperLimitDistance: number = 300;
  static readonly lowerLimitDuration: number = 0;
  static readonly upperLimitDuration: number = 16;
  static readonly lowerLimitElevation: number = 0;
  static readonly upperLimitElevation: number = 3000;
  static readonly lowerLimitRisk: RiskLevel = RiskLevel.UNKNOWN;
  static readonly upperLimitRisk: RiskLevel = RiskLevel.DANGEROUS;
  static readonly lowerLimitDifficulty: GeneralDifficulty = GeneralDifficulty.UNKNOWN;
  static readonly upperLimitDifficulty: GeneralDifficulty = GeneralDifficulty.VERY_CHALLENGING;
  static readonly lowerLimitTravelDistance: number = 0;
  static readonly upperLimitTravelDistance: number = 1200;
  static readonly lowerLimitTravelDuration: number = 0;
  static readonly upperLimitTravelDuration: number = 48;
}

@Component({
  selector: 'app-filters',
  imports: [MatSliderModule, AspectIndicatorComponent],
  templateUrl: './filters.html',
  styleUrl: './filters.scss'
})
export class Filters implements OnInit {
  filterValues = input<FilterValues>();
  filtersChanged = output<FilterValues>();

  protected filterValuesInternal!: FilterValues;

  protected readonly lowerLimitDistance = FilterLimits.lowerLimitDistance;
  protected readonly upperLimitDistance = FilterLimits.upperLimitDistance;
  protected readonly lowerLimitDuration = FilterLimits.lowerLimitDuration;
  protected readonly upperLimitDuration = FilterLimits.upperLimitDuration;
  protected readonly lowerLimitElevation = FilterLimits.lowerLimitElevation;
  protected readonly upperLimitElevation = FilterLimits.upperLimitElevation;
  protected readonly lowerLimitRisk = FilterLimits.lowerLimitRisk;
  protected readonly upperLimitRisk = FilterLimits.upperLimitRisk;
  protected readonly lowerLimitDifficulty = FilterLimits.lowerLimitDifficulty;
  protected readonly upperLimitDifficulty = FilterLimits.upperLimitDifficulty;
  protected readonly lowerLimitTravelDistance = FilterLimits.lowerLimitTravelDistance;
  protected readonly upperLimitTravelDistance = FilterLimits.upperLimitTravelDistance;
  protected readonly lowerLimitTravelDuration = FilterLimits.lowerLimitTravelDuration;
  protected readonly upperLimitTravelDuration = FilterLimits.upperLimitTravelDuration;

  ngOnInit() {
    if (this.filterValues()) {
      this.filterValuesInternal = {...this.filterValues()!};
    }
  }

  private updateFilter<K extends keyof FilterValues>(key: K, value: Partial<FilterValues[K]> | FilterValues[K]): void {
    if (key === 'aspects') {
      // For aspects, directly assign the primitive value
      this.filterValuesInternal = {
        ...this.filterValuesInternal,
        [key]: value as FilterValues[K]
      };
    } else {
      // For range values, merge with existing values
      this.filterValuesInternal = {
        ...this.filterValuesInternal,
        [key]: {
          ...(this.filterValuesInternal[key] as RangeValue | DifficultyRangeValue | RiskRangeValue),
          ...(value as RangeValue | DifficultyRangeValue | RiskRangeValue)
        }
      };
    }
    this.filtersChanged.emit({...this.filterValuesInternal});
  }

  onMinDistanceChanged = (value: number) => this.updateFilter('distance', { min: value });
  onMaxDistanceChanged = (value: number) => this.updateFilter('distance', { max: value });
  onMinDurationChanged = (value: number) => this.updateFilter('duration', { min: value });
  onMaxDurationChanged = (value: number) => this.updateFilter('duration', { max: value });
  onMinElevationChanged = (value: number) => this.updateFilter('elevation', { min: value });
  onMaxElevationChanged = (value: number) => this.updateFilter('elevation', { max: value });
  onMinRiskChanged = (value: RiskLevel) => this.updateFilter('risk', { min: value });
  onMaxRiskChanged = (value: RiskLevel) => this.updateFilter('risk', { max: value });
  onMinDifficultyChanged = (value: GeneralDifficulty) => this.updateFilter('difficulty', { min: value });
  onMaxDifficultyChanged = (value: GeneralDifficulty) => this.updateFilter('difficulty', { max: value });
  onMinTravelDistanceChanged = (value: number) => this.updateFilter('travelDistance', { min: value });
  onMaxTravelDistanceChanged = (value: number) => this.updateFilter('travelDistance', { max: value });
  onMinTravelDurationChanged = (value: number) => this.updateFilter('travelDuration', { min: value });
  onMaxTravelDurationChanged = (value: number) => this.updateFilter('travelDuration', { max: value });
  onAspectsChanged = (value: Aspect | undefined) => {
    if (value === undefined)
    {
      this.updateFilter('aspects', Aspect.UNKNOWN)
    }
    else {
      this.updateFilter('aspects', value);
    }
  };
}
