import { Component, model, output } from '@angular/core';
import { Aspect } from '../../domain/tour-data/aspect';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-aspect-indicator',
  imports: [],
  templateUrl: './aspect-indicator.html',
  styleUrl: './aspect-indicator.scss'
})
export class AspectIndicatorComponent implements FormValueControl<Aspect | null | undefined>{
  value = model<Aspect | null>()

  aspectClick = output<MouseEvent>();

  onAspectPickerClick(event: MouseEvent): void {
    this.aspectClick.emit(event);
  }

  protected containsNorth = (): boolean => this.contains(Aspect.NORTH);
  protected containsNorthEast = (): boolean => this.contains(Aspect.NORTH_EAST);
  protected containsEast = (): boolean => this.contains(Aspect.EAST);
  protected containsSouthEast = (): boolean => this.contains(Aspect.SOUTH_EAST);
  protected containsSouth = (): boolean => this.contains(Aspect.SOUTH);
  protected containsSouthWest = (): boolean => this.contains(Aspect.SOUTH_WEST);
  protected containsWest = (): boolean => this.contains(Aspect.WEST);
  protected containsNorthWest = (): boolean => this.contains(Aspect.NORTH_WEST);

  private contains(aspect: Aspect): boolean {
    const aspects = this.value()
    if (!aspects) return false;
    return (aspects & aspect) > 0;
  }
}