import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kilometers',
})
export class KilometersPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '--'
    }
    let rounded: number = Math.round(value);
    return `${rounded} km`;
  }
}