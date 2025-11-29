import { Aspect } from "../../lib/domain/tour-data/aspect";
import { FilterValues } from "../../lib/domain/tour-data/filter-values";
import { FilterLimits } from "../../lib/ui/filters/filters";

export const DefaultFilters: FilterValues =  {
    distance: { min: FilterLimits.lowerLimitDistance, max: FilterLimits.upperLimitDistance },
    duration: { min: FilterLimits.lowerLimitDuration, max: FilterLimits.upperLimitDuration },
    elevation: { min: FilterLimits.lowerLimitElevation, max: FilterLimits.upperLimitElevation },
    risk: { min: FilterLimits.lowerLimitRisk, max: FilterLimits.upperLimitRisk },
    difficulty: { min: FilterLimits.lowerLimitDifficulty, max: FilterLimits.upperLimitDifficulty },
    travelDistance: { min: FilterLimits.lowerLimitTravelDistance, max: FilterLimits.upperLimitTravelDistance },
    travelDuration: { min: FilterLimits.lowerLimitTravelDuration, max: FilterLimits.upperLimitTravelDuration },
    aspects: 0b1111_1111 as Aspect,
  };