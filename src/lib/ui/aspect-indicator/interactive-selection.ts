import { Directive, inject } from "@angular/core";
import { AspectIndicatorComponent } from "./aspect-indicator";
import { Aspect } from "../../domain/tour-data/aspect";

@Directive({
  selector: '[appInteractiveSelection]',
})
export class InteractiveSelectionDirective {
  private aspectIndicatorComponent = inject(AspectIndicatorComponent);

  constructor() {
  this.aspectIndicatorComponent.onAspectPickerClick = (event: Event) => {
    this.handleAspectClick(event as MouseEvent);
  };
  }

  handleAspectClick(event: MouseEvent): void {
    const target = event.target as SVGElement;
    const aspect = this.getAspectFromId(target.id);

    if (aspect !== undefined) {
      this.aspectIndicatorComponent.value.update((aspects) => {
        return aspects ? aspects ^ aspect : aspect;
      });
    }
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