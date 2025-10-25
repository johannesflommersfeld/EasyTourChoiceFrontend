import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { 
  ActivityPipe,
  DifficultyPipe,
  DurationPipe,
  KilometersPipe,
  MetersPipe,
  RiskPipe
} from '../../../app/utils/pipes';
import { RiskLevel } from '../../domain/tour-data/risk-level';
import { GeneralDifficulty } from '../../domain/tour-data/general-difficulty';
import { ITour } from '../../domain/tour-data/tour';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tour-preview-tile',
  imports: [
    KilometersPipe,
    RouterModule,
    ActivityPipe,
    RiskPipe,
    CommonModule,
    DurationPipe,
    MetersPipe,
    DifficultyPipe,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './tour-preview-tile.html',
  styleUrl: './tour-preview-tile.scss'
})
export class TourPreviewTileComponent {
  tour = input.required<ITour>();
  index = input.required<number>();
  protected tourSelected = output<ITour>();

  protected detailsButtonClicked = (tour: ITour) => this.tourSelected.emit(tour);

  getDifficultyColor = TourPreviewTileComponent.getDifficultyColor;

  static getDifficultyColor(difficulty: GeneralDifficulty): string {
    if (difficulty === GeneralDifficulty.EASY) {
      return '#008a00';
    }
    else if (difficulty === GeneralDifficulty.MILDLY_CHALLENGING) {
      return '#00628f';
    }
    else if (difficulty === GeneralDifficulty.CHALLENGING) {
      return '#a01e1e';
    }
    else {
      return 'black';
    }
  }

  getRiskColor = TourPreviewTileComponent.getRiskColor;

  static getRiskColor(difficulty: RiskLevel): string {
    if (difficulty === RiskLevel.VERY_SAFE) {
      return '#008a00';
    }
    else if (difficulty === RiskLevel.SAFE) {
      return '#008a00';
    }
    else if (difficulty === RiskLevel.MODERATE_RISK) {
      return '#da8a10';
    }
    else if (difficulty === RiskLevel.HIGH_RISK) {
      return '#a01e1e';
    }
    else {
      return 'black';
    }
  }
}