import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersDialogComponentComponent } from './filters-dialog.component';

describe('FiltersDialogComponentComponent', () => {
  let component: FiltersDialogComponentComponent;
  let fixture: ComponentFixture<FiltersDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersDialogComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FiltersDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
