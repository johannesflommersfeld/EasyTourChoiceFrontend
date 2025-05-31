import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleSliderComponent } from './double-slider.component';
import { RiskLevel } from '../models/tour-data/risk-level.model';

describe('DoubleSliderComponentComponent', () => {
  let component: DoubleSliderComponent<RiskLevel>;
  let fixture: ComponentFixture<DoubleSliderComponent<RiskLevel>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubleSliderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DoubleSliderComponent<RiskLevel>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
