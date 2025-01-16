import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '--'
    }
    let hours: number = Math.floor(value);
    let minutes: string = `${Math.round((value - hours) * 60)}`.padStart(2, '0');
    return `${hours}h ${minutes}min`;
  }
}