import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour',
})
export class HourPipe implements PipeTransform {
  transform(value: string): string {
    let hour = new Date(value).getHours()
    return `${hour} h`;
  }
}