import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { ITour, Activity } from './tour-preview/tour.model';
import { TourPreviewComponent } from "./tour-preview/tour-preview.component";
import { ToursService } from '../tours.service';

@Component({
  selector: 'etc-tour-catalog',
  imports: [NgFor, NgClass, TourPreviewComponent],
  templateUrl: './tour-catalog.component.html',
  styleUrl: './tour-catalog.component.css'
})
export class TourCatalogComponent {
  filters: Set<Activity> = new Set();
  Activity = Activity;
  @Output() openTour = new EventEmitter();

  constructor(private toursSvc: ToursService) {
  }

  updateFilter(activity: Activity): void {
    this.filters.has(activity)
      ? this.filters.delete(activity)
      : this.filters.add(activity);
  }

  isSelected(activity: Activity): boolean {
    return this.filters.has(activity);
  }

  clearFilter(): void {
    this.filters.clear();
  }

  showTourDetails(tour: ITour): void {
    this.openTour.emit(tour);
    console.log(`Details of tour ${tour.name} passed on.`)
  }

  getFilteredTours(): ITour[] {
    return this.toursSvc.getFilteredTours(this.filters);
  }
}