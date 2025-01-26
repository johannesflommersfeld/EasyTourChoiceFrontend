import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalancheReportComponent } from './avalanche-report.component';

describe('AvalancheReportComponent', () => {
  let component: AvalancheReportComponent;
  let fixture: ComponentFixture<AvalancheReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvalancheReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvalancheReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
