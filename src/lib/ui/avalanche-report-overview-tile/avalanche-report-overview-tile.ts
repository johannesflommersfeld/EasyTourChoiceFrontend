

import { Component, input } from '@angular/core';
import { TendencyType } from '../../domain/tour-data/tendency-type';
import { ElevationPipe, ProblemPipe, TendencyPipe } from '../../utils/pipes';
import { AvalancheProblem } from '../../domain/tour-data/avalanche-problem';
import { AvalancheFrequency } from '../../domain/tour-data/avalanche-frequency';
import { AvalancheSize } from '../../domain/tour-data/avalanche-size';
import { AspectIndicatorComponent } from '../aspect-indicator/aspect-indicator';
import { MatCardModule } from '@angular/material/card';
import { AvalancheProblemType } from '../../domain/tour-data/avalanche-problem-type';

@Component({
  selector: 'app-avalanche-report-overview-tile',
  imports: [
    AspectIndicatorComponent,
    ElevationPipe,
    TendencyPipe,
    ProblemPipe,
    MatCardModule,
  ],
  templateUrl: './avalanche-report-overview-tile.html',
  styleUrl: './avalanche-report-overview-tile.scss'
})
export class AvalancheReportOverviewTile {
  region = input.required<string>();
  problems = input.required<AvalancheProblem[]>();
  level = input.required<number>();
  riskBoundary = input.required<string>();
  headline = input.required<string>();
  tendency = input.required<TendencyType>();
  time = input<string>();

  protected levelSymbolPath(): string {
    return `/avalanche-reports/levels/${this.level()}.png`
  }

  protected problemSymbolPath(problemType: AvalancheProblemType): string {
    return `/avalanche-reports/problems/${problemType}.png`
  }

  protected getProblemSummary(problem: AvalancheProblem): string {
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

    const frequencies = new Map<AvalancheFrequency, string>([
      [AvalancheFrequency.FEW, 'Few'],
      [AvalancheFrequency.SOME, 'Some'],
      [AvalancheFrequency.MANY, 'Many'],
    ]);

    const sizes = new Map<AvalancheSize, string>([
      [AvalancheSize.SMALL, 'small'],
      [AvalancheSize.MEDIUM, 'medium'],
      [AvalancheSize.LARGE, 'large'],
    ]);

    return `${frequencies.get(problem.frequency)} avalanches of ${sizes.get(problem.avalancheSize)} size ${heightText}.`
  }
}
