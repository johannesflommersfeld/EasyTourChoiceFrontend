import { Component, output } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { RiskLevel } from '../../domain/tour-data/risk-level';
import { GeneralDifficulty } from '../../domain/tour-data/general-difficulty';
import { DifficultyRangeValue, FilterValues, RangeValue, RiskRangeValue } from '../../domain/tour-data/filter-values';
import { AspectIndicatorComponent } from '../aspect-indicator/aspect-indicator';
import { Aspect } from '../../domain/tour-data/aspect';

@Component({
  selector: 'app-filters',
  imports: [MatSliderModule, AspectIndicatorComponent],
  templateUrl: './filters.html',
  styleUrl: './filters.scss'
})
export class Filters {
  readonly lowerLimitDistance: number = 0;
  readonly upperLimitDistance: number = 300;
  readonly lowerLimitDuration: number = 0;
  readonly upperLimitDuration: number = 16;
  readonly lowerLimitElevation: number = 0;
  readonly upperLimitElevation: number = 100;
  readonly lowerLimitRisk: RiskLevel = RiskLevel.UNKNOWN;
  readonly upperLimitRisk: RiskLevel = RiskLevel.DANGEROUS;
  readonly lowerLimitDifficulty: GeneralDifficulty = GeneralDifficulty.UNKNOWN;
  readonly upperLimitDifficulty: GeneralDifficulty = GeneralDifficulty.VERY_CHALLENGING;
  readonly lowerLimitTravelDistance: number = 0;
  readonly upperLimitTravelDistance: number = 1200;
  readonly lowerLimitTravelDuration: number = 0;
  readonly upperLimitTravelDuration: number = 48;

  protected filterValues: FilterValues = {
    distance: { min: this.lowerLimitDistance, max: this.upperLimitDistance },
    duration: { min: this.lowerLimitDuration, max: this.upperLimitDuration },
    elevation: { min: this.lowerLimitElevation, max: this.upperLimitElevation },
    risk: { min: this.lowerLimitRisk, max: this.upperLimitRisk },
    difficulty: { min: this.lowerLimitDifficulty, max: this.upperLimitDifficulty },
    travelDistance: { min: this.lowerLimitTravelDistance, max: this.upperLimitTravelDistance },
    travelDuration: { min: this.lowerLimitTravelDuration, max: this.upperLimitTravelDuration },
    aspects: 0b1111_1111 as Aspect,
  };

  filtersChanged = output<FilterValues>();

  private updateFilter<K extends keyof FilterValues>(key: K, value: Partial<FilterValues[K]> | FilterValues[K]): void {
    if (key === 'aspects') {
      // For aspects, we're dealing with a primitive value, not an object
      this.filterValues = {
        ...this.filterValues,
        [key]: value as FilterValues[K]
      };
    } else {
      // For range values, we can safely spread the objects
      this.filterValues = {
        ...this.filterValues,
        [key]: {
          ...(this.filterValues[key] as RangeValue | DifficultyRangeValue | RiskRangeValue),
          ...(value as RangeValue | DifficultyRangeValue | RiskRangeValue)
        }
      };
    }
    this.filtersChanged.emit(this.filterValues);
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
