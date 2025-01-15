import { AvalancheDangerRating } from "./avalanche-danger-rating.model";
import { ValidTimePeriod } from "./valid-time-period.model";

export class DangerRating {
  mainValue: AvalancheDangerRating;
  upperBound: string | null;
  lowerBound: string | null;
  validTimePeriod: ValidTimePeriod;

  constructor(
    mainValue: AvalancheDangerRating,
    upperBound: string | null,
    lowerBound: string | null,
    validTimePeriod: ValidTimePeriod,
  ) {
    this.mainValue = mainValue;
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
    this.validTimePeriod = validTimePeriod;
  }
}