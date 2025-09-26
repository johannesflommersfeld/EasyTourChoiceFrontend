import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySelector } from './activity-selector';

describe('ActivitySelector', () => {
  let component: ActivitySelector;
  let fixture: ComponentFixture<ActivitySelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
