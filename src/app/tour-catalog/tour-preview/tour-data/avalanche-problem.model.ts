import { Aspect } from "./aspect.model";
import { AvalancheFrequency } from "./avalanche-frequency.model";
import { AvalancheProblemType } from "./avalanche-problem-type.model";
import { SnowpackStability } from "./snowpack-stability.model";
import { ValidTimePeriod } from "./valid-time-period.model";

export class AvalancheProblem {
  ProblemType: AvalancheProblemType;
  UpperBound: string | null;
  LowerBound: string | null;
  ValidTimePeriod: ValidTimePeriod;
  SnowpackStability: SnowpackStability;
  Frequency: AvalancheFrequency;
  AvalancheSize: number;
  Aspect: Aspect;

  constructor(
    problemType: AvalancheProblemType,
    upperBound: string | null,
    lowerBound: string | null,
    validTimePeriod: ValidTimePeriod,
    snowpackStability: SnowpackStability,
    frequency: AvalancheFrequency,
    avalancheSize: number,
    aspect: Aspect
  ) {
    this.ProblemType = problemType;
    this.UpperBound = upperBound;
    this.LowerBound = lowerBound;
    this.ValidTimePeriod = validTimePeriod;
    this.SnowpackStability = snowpackStability;
    this.Frequency = frequency;
    this.AvalancheSize = avalancheSize;
    this.Aspect = aspect;
  }
}
