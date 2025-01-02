import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { TourPreviewComponent } from "./tour-preview/tour-preview.component";
import { ToursService } from '../tours.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Activity } from './tour-preview/tour-data/activity.model';
import { ITour } from './tour-preview/tour-data/tour.model';

@Component({
  selector: 'etc-tour-catalog',
  imports: [NgFor, TourPreviewComponent, RouterModule],
  templateUrl: './tour-catalog.component.html',
  styleUrl: './tour-catalog.component.css'
})
export class TourCatalogComponent {
  filters: Set<Activity> = new Set();
  parameterToActivity: Map<string, Activity> = new Map([
    [Activity.HIKING.toString(), Activity.HIKING],
    [Activity.TREKKING.toString(), Activity.TREKKING],
    [Activity.BOULDERING.toString(), Activity.BOULDERING],
    [Activity.SPORTCLIMBING.toString(), Activity.SPORTCLIMBING],
    [Activity.MULTIPITCHCLIMBING.toString(), Activity.MULTIPITCHCLIMBING],
    [Activity.VIA_VERRATA.toString(), Activity.VIA_VERRATA],
    [Activity.MOUNTAINBIKING.toString(), Activity.MOUNTAINBIKING],
    [Activity.ROADCYCLING.toString(), Activity.ROADCYCLING],
    [Activity.GRAVEL.toString(), Activity.GRAVEL],
    [Activity.BIKEPACKING.toString(), Activity.BIKEPACKING],
    [Activity.SKITOURING.toString(), Activity.SKITOURING],
  ])
  Activity = Activity;
  @Output() openTour = new EventEmitter();

  constructor(
    private toursSvc: ToursService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filters = new Set<Activity>();
      let activity: Activity | undefined = this.parameterToActivity.get(params['filter']);
      if (activity != undefined) {
        this.filters.add(activity);
      }
    })
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