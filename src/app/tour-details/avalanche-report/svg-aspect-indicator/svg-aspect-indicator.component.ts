import { Component, Input } from '@angular/core';
import { Aspect } from '../../../tour-catalog/tour-preview/tour-data/aspect.model';

@Component({
  selector: 'etc-svg-aspect-indicator',
  imports: [],
  templateUrl: './svg-aspect-indicator.component.html',
  styleUrl: './svg-aspect-indicator.component.css'
})
export class SvgAspectIndicatorComponent {
  @Input() aspectMask: Aspect = Aspect.UNKNOWN;

  containsNorth(): boolean {
    return this.contains(Aspect.NORTH);
  }

  containsNorthEast(): boolean {
    return this.contains(Aspect.NORTH_EAST);
  }

  containsEast(): boolean {
    return this.contains(Aspect.EAST);
  }

  containsSouthEast(): boolean {
    return this.contains(Aspect.SOUTH_EAST);
  }

  containsSouth(): boolean {
    return this.contains(Aspect.SOUTH);
  }

  containsSouthWest(): boolean {
    return this.contains(Aspect.SOUTH_WEST);
  }

  containsWest(): boolean {
    return this.contains(Aspect.WEST);
  }

  containsNorthWest(): boolean {
    return this.contains(Aspect.NORTH_WEST);
  }

  contains(aspect: Aspect): boolean {
    return (aspect & this.aspectMask) > 0;
  }


}
