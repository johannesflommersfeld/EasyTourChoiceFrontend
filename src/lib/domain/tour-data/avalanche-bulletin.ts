import { AvalancheProblem } from "./avalanche-problem";
import { DangerRating } from "./danger-ratings";
import { TendencyType } from "./tendency-type";

export class AvalancheBulletin {
  publicationTime: string;
  avalancheProblems: AvalancheProblem[];
  dangerRatings: DangerRating[];
  reportBody: Record<string, string[]>;
  tendency: TendencyType;
  regionName: string | null;

  constructor(
    publicationTime: string,
    avalancheProblems: AvalancheProblem[],
    dangerRatings: DangerRating[],
    reportBody: Record<string, string[]>,
    tendency: TendencyType,
    regionName: string | null
  ) {
    this.publicationTime = publicationTime;
    this.avalancheProblems = avalancheProblems;
    this.dangerRatings = dangerRatings;
    this.reportBody = reportBody;
    this.tendency = tendency;
    this.regionName = regionName;
  }
}