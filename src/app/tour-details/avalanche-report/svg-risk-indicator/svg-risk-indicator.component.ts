import { Component, Input, OnInit } from '@angular/core';
import { DangerRating } from '../../../tour-catalog/tour-preview/tour-data/danger-ratings.model';
import { AvalancheDangerRating } from '../../../tour-catalog/tour-preview/tour-data/avalanche-danger-rating.model';

@Component({
  selector: 'etc-svg-risk-indicator',
  imports: [],
  templateUrl: './svg-risk-indicator.component.html',
  styleUrl: './svg-risk-indicator.component.css'
})
export class SvgRiskIndicatorComponent implements OnInit {
  @Input() ratings: Array<DangerRating> | undefined;
  upperColor: string = '#5d5d5d';
  lowerColor: string = '#5d5d5d';
  private readonly colors: Map<AvalancheDangerRating, string> = new Map([
    [AvalancheDangerRating.LOW, "#CAD758"],
    [AvalancheDangerRating.MODERATE, "#F4E503"],
    [AvalancheDangerRating.CONSIDERABLE, "#F3961B"],
    [AvalancheDangerRating.HIGH, "#E32222"],
    [AvalancheDangerRating.VERY_HIGH, "#E32222"],
    [AvalancheDangerRating.NO_RATING, "#5d5d5d"],
    [AvalancheDangerRating.NO_SNOW, "#5d5d5d"],
  ])

  ngOnInit(): void {
    if (this.ratings?.length == 2) {
      if (this.ratings[0].upperBound == this.ratings[1].lowerBound) {
        this.upperColor = this.colors.get(this.ratings[1].mainValue) ?? this.upperColor;
        this.lowerColor = this.colors.get(this.ratings[0].mainValue) ?? this.lowerColor;
      }
      else {
        this.upperColor = this.colors.get(this.ratings[0].mainValue) ?? this.upperColor;
        this.lowerColor = this.colors.get(this.ratings[1].mainValue) ?? this.lowerColor;
      }
    }
    else if (this.ratings?.length == 1) {
      this.upperColor = this.colors.get(this.ratings[0].mainValue) ?? this.upperColor;
      this.lowerColor = this.colors.get(this.ratings[0].mainValue) ?? this.lowerColor;
    }
  }
}
