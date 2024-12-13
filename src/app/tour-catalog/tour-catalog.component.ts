import { Component} from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { ITour, Tour, Activity } from './tour.model';
import { KilometersPipe } from './kilometers.pipe';

@Component({
  selector: 'etc-tour-catalog',
  imports: [NgFor, NgClass, KilometersPipe],
  templateUrl: './tour-catalog.component.html',
  styleUrl: './tour-catalog.component.css'
})
export class TourCatalogComponent {
  tours: ITour[];
  filters: Set<Activity> = new Set();
  Activity = Activity;

  constructor() {
    // TODO: fetch from backend
    this.tours = [
      new Tour(
        1,
        "A nice and easy hike in Franconia.",
        "Walberla",
        "head-friendly.png",
        Activity.HIKING,
        10.5,
      ),
      new Tour(
        2,
        "Nice view from the top of a boulder.",
        "Retterner Kanzel",
        "head-shredder.png",
        Activity.BOULDERING,
        4.5,
      ),
    ];
  }

  getImageUrl(tour: ITour): string{
    // TODO: generate image with map preview
    return '/activities/' + tour.getActivity() + ".png";
  }

  getFilteredTours() : ITour[] {
    return this.filters.size === 0
      ? this.tours
      : this.tours.filter((tour) => !this.filters.has(tour.activity));
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
}