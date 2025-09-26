import { Aspect } from "./aspect";
import { AvalancheFrequency } from "./avalanche-frequency";
import { AvalancheProblemType } from "./avalanche-problem-type";
import { AvalancheSize } from "./avalanche-size";
import { SnowpackStability } from "./snowpack-stability";
import { ValidTimePeriod } from "./valid-time-period";

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
