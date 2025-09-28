import { Component, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';
import { Map as LeafletMap } from 'leaflet'; 
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToursService } from '../services/tours';
import { Tour } from '../../lib/domain/tour-data/tour';
import { SortingCriterium } from '../../lib/ui/sorting-criterium';

@Component({
  selector: 'app-tour-catalog',
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './tour-catalog.html',
  styleUrl: './tour-catalog.scss'
})
export class TourCatalogComponent implements OnInit {

  protected filters = signal<FilterValues | undefined>(undefined)
  protected readonly tours: Signal<Tour[] | undefined>;

  protected map: LeafletMap | null = null;

  private sortOptions: Record<string, SortingCriterium> = {
    "Distance": SortingCriterium.DISTANCE,
    "Duration": SortingCriterium.DURATION,
    "Elevation": SortingCriterium.METER_OF_ELEVATION,
    "Difficulty": SortingCriterium.DIFFICULTY,
    "Risk": SortingCriterium.RISK,
    "Travel distance": SortingCriterium.TRAVEL_DISTANCE,
    "Travel duration": SortingCriterium.TRAVEL_DURATION,
  };
  protected sortOptionNames: string[] = Object.keys(this.sortOptions);
  protected selectedSortOption = signal<string>("Distance");

  constructor(private router: Router, private tourService: ToursService) {
    this.tours = this.tourService.createToursResource(this.filters.asReadonly(), this.selectedSortOption.asReadonly(), this.sortOptions);
  }

  ngOnInit(): void {
    const navigation = this.router.currentNavigation();
    if (navigation?.extras?.state) {
      this.filters.set(navigation.extras.state['filters'] as FilterValues);
      console.log('Received filters:', this.filters());
    }
  }

  protected updateFilters(newFilters: FilterValues) {
    this.filters.set(newFilters);
  }

  protected onSortOptionChange(optionName: string) {
    this.selectedSortOption.set(optionName);
  }


  onMapReady(map: Event) {
    // this.map = map;
    // if (this.tours) {
    //   this.addMarkers();
    // }
  }

  openFiltersDialog(): void {
    // const dialogRef = this.dialog.open(FiltersDialogComponent, {
    //   width: '600px',
    //   data: { filters: this.filters },
    // });

    // dialogRef.afterOpened().subscribe(() => {
    //   window.dispatchEvent(new Event('resize')); // Trigger a resize event
    // });

    // dialogRef.afterClosed().subscribe((result: Filters) => {
    //   if (result) {
    //     this.filters = result;
    //     this.applyFilters();
    //   }
    // });
  }

}
