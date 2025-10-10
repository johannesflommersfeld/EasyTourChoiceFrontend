import { Component, OnInit, Signal, signal, inject, ViewChildren, QueryList, ElementRef, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToursService } from '../services/tours';
import { ITour, Tour } from '../../lib/domain/tour-data/tour';
import { SortingCriterium } from '../../lib/ui/sorting-criterium';
import { LocationService } from '../services/location';
import { GPSLocation } from '../../lib/domain/tour-data/gps-location';
import { TourListComponent } from '../../lib/ui/tour-list/tour-list';
import { MatIcon } from '@angular/material/icon';
import { MapComponent } from '../../lib/ui/map/map';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialog } from '../../lib/ui/filters-dialog/filters-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Activity } from '../../lib/domain/tour-data/activity';
import { ActivitiesOrdered, ActivityIconNames } from '../utils/activites';
import { DefaultFilters } from '../utils/filters';

const SortOptions: Record<string, SortingCriterium> = {
    "Distance": SortingCriterium.DISTANCE,
    "Duration": SortingCriterium.DURATION,
    "Elevation": SortingCriterium.METER_OF_ELEVATION,
    "Difficulty": SortingCriterium.DIFFICULTY,
    "Risk": SortingCriterium.RISK,
    "Travel distance": SortingCriterium.TRAVEL_DISTANCE,
    "Travel duration": SortingCriterium.TRAVEL_DURATION,
  };

@Component({
  selector: 'app-tour-catalog',
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatIcon, MatProgressSpinnerModule, TourListComponent, MapComponent],
  templateUrl: './tour-catalog.html',
  styleUrl: './tour-catalog.scss'
})
export class TourCatalogComponent implements OnInit {
  private router = inject(Router);
  private tourService = inject(ToursService);
  private locationService = inject(LocationService);
  private dialog = inject(MatDialog);

  protected filters = signal<FilterValues | undefined>(undefined)
  protected location = signal<GPSLocation | undefined>(undefined);
  protected selectedSortOption = signal<string>("Distance");
  protected selectedActivities = signal<Activity[]>([]);
  protected tourListComponent = viewChild<TourListComponent>('tourList');
  @ViewChildren('tourItem') protected tourItems!: QueryList<ElementRef>;
  protected readonly sortOptionNames: string[] = Object.keys(SortOptions);
  protected readonly tours: Signal<Tour[] | undefined>;
  protected readonly availableActivities = ActivitiesOrdered;
  protected readonly activityNames = ActivityIconNames;

  constructor() {
    this.tours = this.tourService.createToursResource(
      this.filters.asReadonly(),
      this.selectedSortOption.asReadonly(),
      this.selectedActivities.asReadonly(),
      SortOptions
    );
  }

  async ngOnInit() {
    if (!this.location()) {
      this.location.set(await this.locationService.getLocation());
    }

    if (history.state && history.state.filters) {
      this.filters.set(history.state.filters as FilterValues);
    }
    else {
      this.filters.set(DefaultFilters);
    }

    if (history.state && history.state.activities) {
      this.selectedActivities.set(history.state.activities as Activity[]);
    }
    else {
      this.selectedActivities.set([Activity.UNDEFINED])
    }
  }

  protected updateFilters = (newFilters: FilterValues) => {
    this.filters.set(newFilters);
    history.replaceState({ ...history.state, filters: newFilters }, '');
  };

  protected onActivityChange = (options: Activity[]) => {
    if (options.includes(Activity.UNDEFINED) && !history.state.activities.includes(Activity.UNDEFINED)) {
      this.selectedActivities.set([Activity.UNDEFINED])
    }
    else {
      this.selectedActivities.set(options.filter(activity => activity !== Activity.UNDEFINED))
    }
    history.replaceState({ ...history.state, activities: this.selectedActivities() }, '');
  };
  
  protected onSortOptionChange = (optionName: string) => this.selectedSortOption.set(optionName);
  protected onTourSelectedFromMap = (index: number) => this.tourListComponent()?.scrollToTour(index);
  protected onTourSelected = (tour: ITour) => this.router.navigate(['/tour-details', tour.id]);

  protected openFiltersDialog() {
    const dialogRef = this.dialog.open(FiltersDialog, {
      data: { filters: this.filters() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.filters.set(result);
        history.replaceState({ ...history.state, filters: result }, '');
      }
    });
  }
}
