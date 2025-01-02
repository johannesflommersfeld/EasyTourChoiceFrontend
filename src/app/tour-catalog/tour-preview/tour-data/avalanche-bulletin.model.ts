import { AvalancheProblem } from "./avalanche-problem.model";
import { DangerRating } from "./danger-ratings.model";
import { TendencyType } from "./tendency-type.model";

export class AvalancheBulletin {
  PublicationTime: any;
  AvalancheProblems: Array<AvalancheProblem>;
  DangerRatings: Array<DangerRating>;
  ReportBody: Map<string, Array<string>>;
  Tendency: TendencyType;
  RegionName: string | null;

  constructor(
    publicationTime: any,
    avalancheProblems: Array<AvalancheProblem>,
    dangerRatings: Array<DangerRating>,
    reportBody: Map<string, Array<string>>,
    tendency: TendencyType,
    regionName: string | null
  ) {
    this.PublicationTime = publicationTime;
    this.AvalancheProblems = avalancheProblems;
    this.DangerRatings = dangerRatings;
    this.ReportBody = reportBody;
    this.Tendency = tendency;
    this.RegionName = regionName;
  }
}