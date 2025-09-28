import { Component, model } from '@angular/core';
import { Aspect } from '../../domain/tour-data/aspect';


@Component({
  selector: 'app-aspect-indicator',
  imports: [],
  templateUrl: './aspect-indicator.html',
  styleUrl: './aspect-indicator.scss'
})
export class AspectIndicatorComponent {

  aspects = model<Aspect>()

  protected onAspectPickerClick(event: MouseEvent): void {
    const target = event.target as SVGElement;
    const aspect = this.getAspectFromId(target.id);
    
    if (aspect !== undefined) {
      this.aspects.update((aspects) => {
        return aspects ? aspects ^ aspect : aspect;
      });
    }
  }

  protected containsNorth(): boolean {
    return this.contains(Aspect.NORTH);
  }

  protected containsNorthEast(): boolean {
    return this.contains(Aspect.NORTH_EAST);
  }

  protected containsEast(): boolean {
    return this.contains(Aspect.EAST);
  }

  protected containsSouthEast(): boolean {
    return this.contains(Aspect.SOUTH_EAST);
  }

  protected containsSouth(): boolean {
    return this.contains(Aspect.SOUTH);
  }

  protected containsSouthWest(): boolean {
    return this.contains(Aspect.SOUTH_WEST);
  }

  protected containsWest(): boolean {
    return this.contains(Aspect.WEST);
  }

  protected containsNorthWest(): boolean {
    return this.contains(Aspect.NORTH_WEST);
  }

  private contains(aspect: Aspect): boolean {
    let aspects = this.aspects()
    if (!aspects) return false;
    return (aspects & aspect) > 0;
  }

  private getAspectFromId(id: string): Aspect | undefined {
    const direction = id.replace(/-(background|selected)$/, '');
    
    const directionMap: Record<string, Aspect> = {
      'north': Aspect.NORTH,
      'north-east': Aspect.NORTH_EAST,
      'east': Aspect.EAST,
      'south-east': Aspect.SOUTH_EAST,
      'south': Aspect.SOUTH,
      'south-west': Aspect.SOUTH_WEST,
      'west': Aspect.WEST,
      'north-west': Aspect.NORTH_WEST
    };
    
    return directionMap[direction];
  }
}