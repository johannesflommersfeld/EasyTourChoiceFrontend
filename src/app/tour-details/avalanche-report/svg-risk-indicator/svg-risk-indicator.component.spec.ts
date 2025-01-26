import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgRiskIndicatorComponent } from './svg-risk-indicator.component';

describe('SvgRiskIndicatorComponent', () => {
  let component: SvgRiskIndicatorComponent;
  let fixture: ComponentFixture<SvgRiskIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgRiskIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgRiskIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
