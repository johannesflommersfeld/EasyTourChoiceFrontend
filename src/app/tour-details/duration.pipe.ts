import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '--'
    }
    return `${value} h`;
  }
}