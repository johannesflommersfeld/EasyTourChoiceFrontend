import { Pipe, PipeTransform } from '@angular/core';
import { GeneralDifficulty } from '../models/tour-data/general-difficulty.model';

@Pipe({
  name: 'difficulty',
})
export class DifficultyPipe implements PipeTransform {
  transform(value: GeneralDifficulty | null): string {
    if (value == null) {
      return 'unknown'
    }
    if (value == GeneralDifficulty.EASY) {
      return 'easy'
    }
    else if (value == GeneralDifficulty.MILDLY_CHALLENGING) {
      return 'mildly challenging'
    }
    else if (value == GeneralDifficulty.CHALLENGING) {
      return 'challenging'
    }
    else if (value == GeneralDifficulty.VERY_CHALLENGING) {
      return 'very challenging'
    }
    return 'unknown'

  }
}