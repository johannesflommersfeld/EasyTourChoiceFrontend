import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'kilometers',
})
export class KilometersPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} km`;
  }
}