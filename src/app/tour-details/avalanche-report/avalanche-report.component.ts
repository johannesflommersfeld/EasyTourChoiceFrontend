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

@Component({
  selector: 'etc-avalanche-report',
  imports: [CommonModule, SvgRiskIndicatorComponent, ElevationPipe, SvgAspectIndicatorComponent],
  templateUrl: './avalanche-report.component.html',
  styleUrl: './avalanche-report.component.css'
})
export class AvalancheReportComponent {
  @Input() bulletin: AvalancheBulletin | undefined;

  getRegion(): string {
    return this.bulletin?.regionName ?? "";
  }

  getAspectMask(): number {
    let aspectMask: Aspect = Aspect.UNKNOWN;
    this.bulletin?.avalancheProblems.forEach(problem => {
      aspectMask |= problem.aspect;
    });
    return aspectMask;
  }

  getRiskBoundary(): string {
    if (this.bulletin?.dangerRatings.length != 2) {
      return "";
    }

    if (this.bulletin.dangerRatings[0].upperBound == this.bulletin.dangerRatings[1].lowerBound) {
      return this.bulletin.dangerRatings[0].upperBound!;
    }
    else {
      return this.bulletin.dangerRatings[0].lowerBound!;
    }
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

  getLevelSymbolPath(ratings: DangerRating[]): string {
    const maxRating: number = Math.max(...ratings.map(rating => rating.mainValue.valueOf()));
    return `/avalanche-reports/levels/${maxRating}.png`
  }

  getProblemSymbolPath(problemType: AvalancheProblemType): string {
    return `/avalanche-reports/problems/${problemType}.png`
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
}
