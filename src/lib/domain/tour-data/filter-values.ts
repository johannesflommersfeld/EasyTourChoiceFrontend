import { Aspect } from "./aspect";
import { GeneralDifficulty } from "./general-difficulty";
import { RiskLevel } from "./risk-level";

export interface RangeValue {
  min: number;
  max: number;
}

export interface DifficultyRangeValue {
  min: GeneralDifficulty;
  max: GeneralDifficulty;
}

export interface RiskRangeValue {
  min: RiskLevel;
  max: RiskLevel;
}

export interface FilterValues {
  distance: RangeValue;
  duration: RangeValue;
  elevation: RangeValue;
  risk: RiskRangeValue;
  difficulty: DifficultyRangeValue;
  travelDistance: RangeValue;
  travelDuration: RangeValue;
  // TODO: add aspects
}