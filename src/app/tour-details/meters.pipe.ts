import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meters',
})
export class MetersPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '--'
    }
    return `${value} m`;
  }
}