import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KilometersPipe } from './kilometers.pipe';
import { RouterModule } from '@angular/router';
import { ITour } from '../../models/tour-data/tour.model';
import { ActivityPipe } from "./activity.pipe";
import { RsikPipe } from "../../tour-details/risk.pipe";
import { CommonModule } from '@angular/common';
import { GeneralDifficulty } from '../../models/tour-data/general-difficulty.model';
import { RiskLevel } from '../../models/tour-data/risk-level.model';
import { DurationPipe } from "../../tour-details/duration.pipe";
import { MetersPipe } from "../../tour-details/meters.pipe";
import { DifficultyPipe } from "../../tour-details/difficulty.pipe";


@Component({
  selector: 'etc-tour-preview',
  imports: [KilometersPipe, RouterModule, ActivityPipe, RsikPipe, CommonModule, DurationPipe, MetersPipe, DifficultyPipe],
  templateUrl: './tour-preview.component.html',
  styleUrl: './tour-preview.component.css'
})
export class TourPreviewComponent {
  @Input() tour!: ITour;
  @Input() index!: number;
  @Output() open = new EventEmitter();


  getImageUrl(tour: ITour): string {
    // TODO: generate image with map preview
    return '/activities/hiking.png';
  }

  detailsButtonClicked(tour: ITour): void {
    this.open.emit();
    console.log(`Details of tour ${tour.name}.`)
  }

  getDifficultyColor = TourPreviewComponent.getDifficultyColor;

  static getDifficultyColor(difficulty: GeneralDifficulty): string {
    if (difficulty === GeneralDifficulty.EASY) {
      return ' #008a00 ';
    }
    else if (difficulty === GeneralDifficulty.MILDLY_CHALLENGING) {
      return ' #00628f';
    }
    else if (difficulty === GeneralDifficulty.CHALLENGING) {
      return ' #a01e1e';
    }
    else {
      return 'black';
    }
  }

  getRiskColor = TourPreviewComponent.getRiskColor;

  static getRiskColor(difficulty: RiskLevel): string {
    if (difficulty === RiskLevel.VERY_SAFE) {
      return ' #008a00';
    }
    else if (difficulty === RiskLevel.SAFE) {
      return ' #008a00';
    }
    else if (difficulty === RiskLevel.MODERATE_RISK) {
      return ' #da8a10';
    }
    else if (difficulty === RiskLevel.HIGH_RISK) {
      return ' #a01e1e';
    }
    else {
      return 'black';
    }
  }
}
