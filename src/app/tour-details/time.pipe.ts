import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  private readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  transform(value: string): string {
    const date: Date = new Date(value);
    const hour: number = date.getHours();
    const day: number = date.getDay();
    const month: string = this.months[date.getMonth()];
    return `${month} ${day}, ${hour}h`;
  }
}