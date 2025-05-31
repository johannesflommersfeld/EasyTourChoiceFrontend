// double-slider.component.ts
import { Component, forwardRef, Input, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Options, NgxSliderModule, ChangeContext, SliderComponent } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';

export interface DoubleSliderValue<T> {
  lowValue: number;
  highValue: number;
}

@Component({
  selector: 'etc-double-slider',
  standalone: true,
  imports: [NgxSliderModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './double-slider.component.html',
  styleUrls: ['./double-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DoubleSliderComponent),
      multi: true
    }
  ]
})
export class DoubleSliderComponent<T> implements ControlValueAccessor, AfterViewInit {
  sliderInitialized = false;

  private _options!: Options;
  @Input()
  set options(opts: Options) {
    this._options = { ...opts, translate: this.translate ?? opts.translate };
    this.cdr.markForCheck();
  }
  get options(): Options { return this._options; }

  @Input() enumType?: Record<string, T>;
  @Input() translate?: (value: number) => string;

  @ViewChild(SliderComponent) slider!: SliderComponent;
  @Input() manualRefresh: EventEmitter<void> = new EventEmitter<void>();

  sliderValues: DoubleSliderValue<T> = { lowValue: 0, highValue: 0 };

  private onChange: (value: DoubleSliderValue<T>) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // after initial render, unhide slider
    Promise.resolve().then(() => {
      this.sliderInitialized = true;
      console.log('Slider initialized');
      this.cdr.detectChanges();
    });
  }

  refreshSlider(): void {
    if (this.manualRefresh) {
      this.manualRefresh.emit(); // Emit the manualRefresh event to trigger a layout recalculation
    }
  }

  writeValue(val: DoubleSliderValue<T> | null): void {
    if (val == null) {
      if (this.enumType) {
        const keys = Object.keys(this.enumType);
        this.sliderValues = {
          lowValue: Number(this.enumType[keys[0]]),
          highValue: Number(this.enumType[keys[keys.length - 1]])
        };
      } else {
        this.sliderValues = {
          lowValue: this._options.floor!,
          highValue: this._options.ceil!
        };
      }
    } else {
      this.sliderValues = val;
    }
    this.onChange(this.sliderValues);
    Promise.resolve().then(() => this.cdr.markForCheck());
  }

  registerOnChange(fn: (value: DoubleSliderValue<T>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSliderChange(ctx: ChangeContext) {
    const low = ctx.value ?? this._options.floor!;
    const high = ctx.highValue ?? this._options.ceil!;
    this.sliderValues = { lowValue: low, highValue: high };
    this.onChange(this.sliderValues);
    this.cdr.markForCheck();
  }
}