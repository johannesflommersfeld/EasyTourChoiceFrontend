import { AvalancheDangerRating } from "./avalanche-danger-rating.model";
import { ValidTimePeriod } from "./valid-time-period.model";

export class DangerRating {
  MainValue: AvalancheDangerRating;
  UpperBound: string | null;
  LowerBound: string | null;
  ValidTimePeriod: ValidTimePeriod;

  constructor(
    mainValue: AvalancheDangerRating,
    upperBound: string | null,
    lowerBound: string | null,
    validTimePeriod: ValidTimePeriod,
  ) {
    this.MainValue = mainValue;
    this.UpperBound = upperBound;
    this.LowerBound = lowerBound;
    this.ValidTimePeriod = validTimePeriod;
  }
}