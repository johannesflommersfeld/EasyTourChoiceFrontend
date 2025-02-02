import { AvalancheProblem } from "./avalanche-problem.model";
import { DangerRating } from "./danger-ratings.model";
import { TendencyType } from "./tendency-type.model";

export class AvalancheBulletin {
  publicationTime: string;
  avalancheProblems: Array<AvalancheProblem>;
  dangerRatings: Array<DangerRating>;
  reportBody: { [id: string]: string[] };
  tendency: TendencyType;
  regionName: string | null;

  constructor(
    publicationTime: string,
    avalancheProblems: Array<AvalancheProblem>,
    dangerRatings: Array<DangerRating>,
    reportBody: { [id: string]: string[] },
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