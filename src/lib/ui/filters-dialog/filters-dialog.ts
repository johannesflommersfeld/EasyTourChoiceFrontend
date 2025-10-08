import { Component, Inject, inject, model, OnInit } from '@angular/core';
import { FilterLimits, Filters } from '../filters/filters';
import { FilterValues } from '../../domain/tour-data/filter-values';
import { Aspect } from '../../domain/tour-data/aspect';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-filters-dialog',
  imports: [Filters, MatButton, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './filters-dialog.html',
  styleUrl: './filters-dialog.scss'
})
export class FiltersDialog {
  protected readonly data: {filters: FilterValues} = inject(MAT_DIALOG_DATA);
  protected readonly filters = model(this.data.filters);

  protected onFiltersChanged = (filters: FilterValues) => this.filters.set(filters);
}
