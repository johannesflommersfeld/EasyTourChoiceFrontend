import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elevation',
})
export class ElevationPipe implements PipeTransform {
  transform(value: string | null): string {
    if (value == null) {
      return ''
    }
    if (value == 'treeline') {
      return value;
    }
    return `${value} m`;
  }
}