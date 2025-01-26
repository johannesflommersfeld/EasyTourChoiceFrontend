import { Aspect } from "./aspect.model";
import { AvalancheFrequency } from "./avalanche-frequency.model";
import { AvalancheProblemType } from "./avalanche-problem-type.model";
import { AvalancheSize } from "./avalanche-size.model";
import { SnowpackStability } from "./snowpack-stability.model";
import { ValidTimePeriod } from "./valid-time-period.model";

export class AvalancheProblem {
  problemType: AvalancheProblemType;
  upperBound: string | null;
  lowerBound: string | null;
  validTimePeriod: ValidTimePeriod;
  snowpackStability: SnowpackStability;
  frequency: AvalancheFrequency;
  avalancheSize: AvalancheSize;
  aspect: Aspect;

  constructor(
    problemType: AvalancheProblemType,
    upperBound: string | null,
    lowerBound: string | null,
    validTimePeriod: ValidTimePeriod,
    snowpackStability: SnowpackStability,
    frequency: AvalancheFrequency,
    avalancheSize: AvalancheSize,
    aspect: Aspect
  ) {
    this.problemType = problemType;
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
    this.validTimePeriod = validTimePeriod;
    this.snowpackStability = snowpackStability;
    this.frequency = frequency;
    this.avalancheSize = avalancheSize;
    this.aspect = aspect;
  }
}
