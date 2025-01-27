import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvalancheBulletin } from '../../tour-catalog/tour-preview/tour-data/avalanche-bulletin.model';
import { SvgRiskIndicatorComponent } from "./svg-risk-indicator/svg-risk-indicator.component";
import { AvalancheProblem } from '../../tour-catalog/tour-preview/tour-data/avalanche-problem.model';
import { AvalancheProblemType } from '../../tour-catalog/tour-preview/tour-data/avalanche-problem-type.model';
import { AvalancheFrequency } from '../../tour-catalog/tour-preview/tour-data/avalanche-frequency.model';
import { AvalancheSize } from '../../tour-catalog/tour-preview/tour-data/avalanche-size.model';
import { TendencyType } from '../../tour-catalog/tour-preview/tour-data/tendency-type.model';
import { DangerRating } from '../../tour-catalog/tour-preview/tour-data/danger-ratings.model';
import { ElevationPipe } from "./elevation.pipe";
import { SvgAspectIndicatorComponent } from "./svg-aspect-indicator/svg-aspect-indicator.component";
import { Aspect } from '../../tour-catalog/tour-preview/tour-data/aspect.model';
import { ValidTimePeriod } from '../../tour-catalog/tour-preview/tour-data/valid-time-period.model';

@Component({
  selector: 'etc-avalanche-report',
  imports: [CommonModule, SvgRiskIndicatorComponent, ElevationPipe, SvgAspectIndicatorComponent],
  templateUrl: './avalanche-report.component.html',
  styleUrl: './avalanche-report.component.css'
})
export class AvalancheReportComponent {
  @Input() bulletin: AvalancheBulletin | undefined;

  changesThroughoutDay(): boolean {
    return this.bulletin?.dangerRatings.some(rating => rating.validTimePeriod != ValidTimePeriod.ALL_DAY) ?? false;
  }

  getRegion(): string {
    return this.bulletin?.regionName ?? "";
  }

  getProblemSummary(problem: AvalancheProblem): string {
    let heightText = "";
    if (problem.lowerBound == null && problem.upperBound != null) {
      heightText = `below ${problem.upperBound}`
    }
    else if (problem.lowerBound != null && problem.upperBound == null) {
      heightText = `above ${problem.lowerBound}`
    }
    else if (problem.lowerBound != null && problem.upperBound != null) {
      heightText = `between ${problem.lowerBound} and ${problem.upperBound}`
    }
    else {
      heightText = `at all heights`
    }

    const frequencies: Map<AvalancheFrequency, string> = new Map([
      [AvalancheFrequency.FEW, 'Few'],
      [AvalancheFrequency.SOME, 'Some'],
      [AvalancheFrequency.MANY, 'Many'],
    ]);

    const sizes: Map<AvalancheSize, string> = new Map([
      [AvalancheSize.SMALL, 'small'],
      [AvalancheSize.MEDIUM, 'medium'],
      [AvalancheSize.LARGE, 'large'],
    ]);

    return `${frequencies.get(problem.frequency)} avalanches of ${sizes.get(problem.avalancheSize)} size ${heightText}.`
  }

  getTendencyText(tendency: TendencyType): string {
    if (tendency == TendencyType.DECREASING) {
      return 'decreasing';
    }
    else if (tendency == TendencyType.INCREASING) {
      return 'increasing'
    }
    else if (tendency == TendencyType.STEADY) {
      return 'steady';
    }
    return 'unknown';
  }

  getProblemTypeText(problem: AvalancheProblem): string {
    const problemNames: Map<AvalancheProblemType, string> = new Map([
      [AvalancheProblemType.NEW_SNOW, 'New snow'],
      [AvalancheProblemType.WIND_SLAB, 'Wind slab'],
      [AvalancheProblemType.GLIDING_SNOW, 'Gliding snow'],
      [AvalancheProblemType.WET_SNOW, 'Wet snow'],
      [AvalancheProblemType.PERSISTENT_WEAK_LAYERS, 'Persistent weak layer'],
      [AvalancheProblemType.CORNICES, 'Cornices'],
    ]);

    return problemNames.get(problem.problemType) ?? '';
  }

  getHeadline(): string {
    let activityText = this.bulletin?.reportBody["Avalanche activity"];
    if (activityText && activityText.length > 0) {
      return activityText[0];
    }
    return "";
  }


  getRiskBoundary(): string {
    return this.getFilteredRiskBoundary(ValidTimePeriod.ALL_DAY);
  }

  getEarlierRiskBoundary(): string {
    return this.getFilteredRiskBoundary(ValidTimePeriod.EARLIER);
  }

  getLaterRiskBoundary(): string {
    return this.getFilteredRiskBoundary(ValidTimePeriod.LATER);
  }

  getProblemSymbolPath(problemType: AvalancheProblemType): string {
    return `/avalanche-reports/problems/${problemType}.png`
  }

  getLevelSymbolPath(): string {
    return this.getFilteredLevelSymbolPath(ValidTimePeriod.ALL_DAY)
  }

  getEarlierLevelSymbolPath(): string {
    return this.getFilteredLevelSymbolPath(ValidTimePeriod.EARLIER)
  }

  getLaterLevelSymbolPath(): string {
    return this.getFilteredLevelSymbolPath(ValidTimePeriod.LATER)
  }

  getAspectMask(): number {
    return this.getFilteredAspectMask(ValidTimePeriod.ALL_DAY)
  }

  getEarlierAspectMask(): number {
    return this.getFilteredAspectMask(ValidTimePeriod.EARLIER)
  }

  getLaterAspectMask(): number {
    return this.getFilteredAspectMask(ValidTimePeriod.LATER)
  }

  getEarlierRatings(): DangerRating[] {
    return this.getFilteredRatings(ValidTimePeriod.EARLIER)
  }

  getLaterRatings(): DangerRating[] {
    return this.getFilteredRatings(ValidTimePeriod.LATER)
  }

  getEarlierProblems(): AvalancheProblem[] {
    return this.getFilteredProblems(ValidTimePeriod.EARLIER)
  }

  getLaterProblems(): AvalancheProblem[] {
    return this.getFilteredProblems(ValidTimePeriod.LATER)
  }

  private getFilteredRiskBoundary(validTime: ValidTimePeriod): string {
    const ratings: DangerRating[] = this.getFilteredRatings(validTime)
    if (ratings.length != 2) {
      return "";
    }

    if (ratings[0].upperBound == ratings[1].lowerBound) {
      return ratings[0].upperBound!;
    }
    else {
      return ratings[0].lowerBound!;
    }
  }

  private getFilteredLevelSymbolPath(validTime: ValidTimePeriod): string {
    const maxRating: number = Math.max(...this.getFilteredRatings(validTime).map(rating => rating.mainValue.valueOf()));
    return `/avalanche-reports/levels/${maxRating}.png`
  }

  private getFilteredRatings(validTime: ValidTimePeriod): DangerRating[] {
    return this.bulletin?.dangerRatings.filter(rating => rating.validTimePeriod == validTime || rating.validTimePeriod == ValidTimePeriod.ALL_DAY) ?? [];
  }

  private getFilteredAspectMask(validTime: ValidTimePeriod): number {
    let aspectMask: Aspect = Aspect.UNKNOWN;
    this.getFilteredProblems(validTime).forEach(problem => {
      aspectMask |= problem.aspect;
    });
    return aspectMask;
  }

  private getFilteredProblems(validTime: ValidTimePeriod): AvalancheProblem[] {
    return this.bulletin?.avalancheProblems.filter(problem => problem.validTimePeriod == validTime || problem.validTimePeriod == ValidTimePeriod.ALL_DAY) ?? [];
  }
}
