import { Component, model } from '@angular/core';
import { Aspect } from '../../domain/tour-data/aspect';
import { FormValueControl } from '@angular/forms/signals';


@Component({
  selector: 'app-aspect-indicator',
  imports: [],
  templateUrl: './aspect-indicator.html',
  styleUrl: './aspect-indicator.scss'
})
export class AspectIndicatorComponent implements FormValueControl<Aspect | undefined> {

  value = model<Aspect>()

  protected onAspectPickerClick(event: MouseEvent): void {
    const target = event.target as SVGElement;
    const aspect = this.getAspectFromId(target.id);
    
    if (aspect !== undefined) {
      this.value.update((aspects) => {
        return aspects ? aspects ^ aspect : aspect;
      });
    }
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