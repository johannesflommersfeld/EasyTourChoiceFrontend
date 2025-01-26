import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAspectIndicatorComponent } from './svg-aspect-indicator.component';

describe('SvgAspectIndicatorComponent', () => {
  let component: SvgAspectIndicatorComponent;
  let fixture: ComponentFixture<SvgAspectIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgAspectIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgAspectIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
