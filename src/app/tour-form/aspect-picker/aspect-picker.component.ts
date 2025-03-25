import { Component, forwardRef } from '@angular/core';
import { Aspect } from '../../models/tour-data/aspect.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'etc-aspect-picker',
  imports: [],
  templateUrl: './aspect-picker.component.html',
  styleUrl: './aspect-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AspectPickerComponent),
      multi: true
    }
  ]
})
export class AspectPickerComponent implements ControlValueAccessor {
  aspects: Aspect = Aspect.UNKNOWN;

  onChange: (value: Aspect) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: Aspect): void {
    this.aspects = value;
  }

  registerOnChange(fn: (value: Aspect) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onAspectPickerClick(event: MouseEvent): void {
    const target = event.target as SVGElement;
    const targetId: string = target.id;

    switch (targetId) {
      case "north-background":
      case "north-selected":
        this.aspects = this.aspects ^ Aspect.NORTH;
        break;

      case "north-east-background":
      case "north-east-selected":
        this.aspects = this.aspects ^ Aspect.NORTH_EAST;
        break;

      case "east-background":
      case "east-selected":
        this.aspects = this.aspects ^ Aspect.EAST;
        break;

      case "south-east-background":
      case "south-east-selected":
        this.aspects = this.aspects ^ Aspect.SOUTH_EAST;
        break;

      case "south-background":
      case "south-selected":
        this.aspects = this.aspects ^ Aspect.SOUTH;
        break;

      case "south-west-background":
      case "south-west-selected":
        this.aspects = this.aspects ^ Aspect.SOUTH_WEST;
        break;

      case "west-background":
      case "west-selected":
        this.aspects = this.aspects ^ Aspect.WEST;
        break;

      case "north-west-background":
      case "north-west-selected":
        this.aspects = this.aspects ^ Aspect.NORTH_WEST;
        break;
    }
    if (targetId) {
      this.onChange(this.aspects);
      this.onTouched();
    }
  }

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

  private contains(aspect: Aspect): boolean {
    return (this.aspects & aspect) > 0;
  }
}
