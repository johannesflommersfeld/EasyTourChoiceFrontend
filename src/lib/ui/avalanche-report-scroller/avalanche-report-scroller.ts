import { Component, input } from '@angular/core';
import { AvalancheBulletin } from '../../domain/tour-data/avalanche-bulletin';
import { AvalancheReportOverviewTile } from '../avalanche-report-overview-tile/avalanche-report-overview-tile';
import { ValidTimePeriod } from '../../domain/tour-data/valid-time-period';
import { DangerRating } from '../../domain/tour-data/danger-ratings';
import { AvalancheProblem } from '../../domain/tour-data/avalanche-problem';
import { AvalancheReportDetailsTile } from '../avalanche-report-details-tile/avalanche-report-details-tile';

@Component({
  selector: 'app-avalanche-report-scroller',
  imports: [
    AvalancheReportOverviewTile,
    AvalancheReportDetailsTile,
  ],
  templateUrl: './avalanche-report-scroller.html',
  styleUrl: './avalanche-report-scroller.scss'
})
export class AvalancheReportScroller {
  bulletin = input.required<AvalancheBulletin>();

  protected changesThroughoutDay() {
    return this.bulletin()?.dangerRatings.some(rating => rating.validTimePeriod != ValidTimePeriod.ALL_DAY) ?? false;
  }

  protected getRegion(): string {
    return this.bulletin()?.regionName ?? "";
  }

  protected getLevel(): number {
    return this.getFilteredLevel(ValidTimePeriod.ALL_DAY);
  }

  protected getEarlierLevel(): number {
    return this.getFilteredLevel(ValidTimePeriod.EARLIER);
  }

  protected getLaterLevel(): number {
    return this.getFilteredLevel(ValidTimePeriod.LATER);
  }

  getProblems(): AvalancheProblem[] {
    return this.getFilteredProblems(ValidTimePeriod.ALL_DAY)
  }

  getEarlierProblems(): AvalancheProblem[] {
    return this.getFilteredProblems(ValidTimePeriod.EARLIER)
  }

  getLaterProblems(): AvalancheProblem[] {
    return this.getFilteredProblems(ValidTimePeriod.LATER)
  }

  protected getHeadline(): string {
    const activityText = this.bulletin()?.reportBody["Avalanche activity"];
    if (activityText && activityText.length > 0) {
      return activityText[0];
    }
    return "";
  }

  protected getRiskBoundary(): string {
    return this.getFilteredRiskBoundary(ValidTimePeriod.ALL_DAY);
  }

  protected getEarlierRiskBoundary(): string {
    return this.getFilteredRiskBoundary(ValidTimePeriod.EARLIER);
  }

  protected getLaterRiskBoundary(): string {
    return this.getFilteredRiskBoundary(ValidTimePeriod.LATER);
  }

  private getFilteredProblems(validTime: ValidTimePeriod): AvalancheProblem[] {
    return this.bulletin()?.avalancheProblems.filter(problem => problem.validTimePeriod == validTime || problem.validTimePeriod == ValidTimePeriod.ALL_DAY) ?? [];
  }

  private getFilteredLevel(validTime: ValidTimePeriod): number {
    return Math.max(...this.getFilteredRatings(validTime).map(rating => rating.mainValue.valueOf()));
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

  private getFilteredRatings(validTime: ValidTimePeriod): DangerRating[] {
    return this.bulletin()?.dangerRatings.filter(rating => rating.validTimePeriod == validTime || rating.validTimePeriod == ValidTimePeriod.ALL_DAY) ?? [];
  }
}
