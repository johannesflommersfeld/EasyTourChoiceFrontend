import { Component, forwardRef, Input } from '@angular/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Options } from "@angular-slider/ngx-slider";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export interface DoubleSliderValue<T> {
  highValue: number;
  lowValue: number;
}

@Component({
  selector: 'etc-double-slider',
  imports: [NgxSliderModule],
  templateUrl: './double-slider.component.html',
  styleUrl: './double-slider.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DoubleSliderComponent),
      multi: true
    }
  ]
})
export class DoubleSliderComponent<T> implements ControlValueAccessor {
  @Input() options!: Options;
  @Input() enumType?: { [key: string]: T };
  @Input() translate?: (value: number) => string;

  sliderValues: DoubleSliderValue<T> = {
    highValue: 0,
    lowValue: 0,
  };

  ngOnInit(): void {
    if (this.enumType) {
      this.sliderValues.highValue = Number(this.enumType[Object.keys(this.enumType)[0]]);
      this.sliderValues.lowValue = Number(this.enumType[Object.keys(this.enumType)[Object.keys(this.enumType).length - 1]]);
    }
    else {
      this.sliderValues.highValue = this.options.floor!;
      this.sliderValues.lowValue = this.options.ceil!;
    }

    if (this.translate) {
      this.options.translate = this.translate;
    }
  }

  onChange: (value: DoubleSliderValue<T>) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: DoubleSliderValue<T>): void {
    this.sliderValues = value;
  }
  registerOnChange(fn: (value: DoubleSliderValue<T>) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}