import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TourPreviewComponent } from "./tour-preview/tour-preview.component";
import { ToursService } from '../tours.service';
import { Router, RouterModule } from '@angular/router';
import { Activity } from '../models/tour-data/activity.model';
import { ITour, Tour } from '../models/tour-data/tour.model';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import L, { icon, Icon, latLng, Layer, marker, tileLayer, Map as LeafletMap, MarkerOptions, divIcon } from 'leaflet';
import { GPSLocation } from '../models/tour-data/gps-location.model';
import { LocationService } from '../location.service';
import { GeneralDifficulty } from '../models/tour-data/general-difficulty.model';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RiskLevel } from '../models/tour-data/risk-level.model';
import { Aspect } from '../models/tour-data/aspect.model';
import { FormsModule } from '@angular/forms';

export type Filters = {
  activitiesFlag: number | undefined;
  minDistance: number | undefined;
  maxDistance: number | undefined;
  minDuration: number | undefined;
  maxDuration: number | undefined;
  minMetersOfElevation: number | undefined;
  maxMetersOfElevation: number | undefined;
  minDifficulty: GeneralDifficulty | undefined;
  maxDifficulty: GeneralDifficulty | undefined;
  minRisk: RiskLevel | undefined;
  maxRisk: RiskLevel | undefined;
  minTravelDistance: number | undefined;
  maxTravelDistance: number | undefined;
  minTravelDuration: number | undefined;
  maxTravelDuration: number | undefined;
  aspects: Aspect | undefined;
}

enum SortingCriteria {
  DISTANCE,
  DURATION,
  METER_OF_ELEVATION,
  DIFFICULTY,
  RISK,
  TRAVEL_DISTANCE,
  TRAVEL_DURATION,
}

@Component({
  selector: 'etc-tour-catalog',
  imports: [NgFor, TourPreviewComponent, RouterModule, LeafletModule, CommonModule, FormsModule],
  templateUrl: './tour-catalog.component.html',
  styleUrl: './tour-catalog.component.scss'
})
export class TourCatalogComponent {
  // TODO: implement proper filtering
  filters: Filters = {
    activitiesFlag: undefined,
    minDistance: undefined,
    maxDistance: undefined,
    minDuration: undefined,
    maxDuration: undefined,
    minMetersOfElevation: undefined,
    maxMetersOfElevation: undefined,
    minDifficulty: undefined,
    maxDifficulty: undefined,
    minRisk: undefined,
    maxRisk: undefined,
    minTravelDistance: undefined,
    maxTravelDistance: undefined,
    minTravelDuration: undefined,
    maxTravelDuration: undefined,
    aspects: undefined
  };
  sortingCriteria: typeof SortingCriteria = SortingCriteria;
  sortOption: SortingCriteria = SortingCriteria.DISTANCE;
  tours: Tour[] | null = null;
  allTours: Tour[] | null = null;
  Activity = Activity;
  map: LeafletMap | null = null;
  isLoading: boolean = true;
  showFilters: boolean = false;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href = "https://www.openstreetmap.org/copyright" > OpenStreetMap </a> contributors' }),
    ] as Layer[],
    zoom: 8,
    center: latLng(46, 7)
  };
  @Output() openTour = new EventEmitter();
  @ViewChildren('tourItem') tourItems!: QueryList<ElementRef>;

  private location: GPSLocation | null = null;

  constructor(
    private toursSvc: ToursService,
    private locationService: LocationService,
    private dialog: MatDialog,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { filters: Filters };
    if (state?.filters) {
      this.filters = state.filters;
    }
  }

  async ngOnInit() {
    this.isLoading = true;

    try {
      if (!this.location) {
        this.location = await this.locationService.getLocation();
      }

      this.toursSvc.fetchAllTours(this.location).subscribe((tours) => {
        this.allTours = tours;
        this.applyFilters();
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error initializing tour catalog:', error);
      this.isLoading = false;
    }
  }

  openFiltersDialog(): void {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      width: '600px',
      data: { filters: this.filters },
    });

    dialogRef.afterOpened().subscribe(() => {
      window.dispatchEvent(new Event('resize')); // Trigger a resize event
    });

    dialogRef.afterClosed().subscribe((result: Filters) => {
      if (result) {
        this.filters = result;
        this.applyFilters();
      }
    });
  }

  onFiltersApplied(filters: any): void {
    this.filters = filters;
    this.applyFilters();
  }

  clearFilter(): void {
    this.filters = {
      activitiesFlag: undefined,
      minDistance: undefined,
      maxDistance: undefined,
      minDuration: undefined,
      maxDuration: undefined,
      minMetersOfElevation: undefined,
      maxMetersOfElevation: undefined,
      minDifficulty: undefined,
      maxDifficulty: undefined,
      minRisk: undefined,
      maxRisk: undefined,
      minTravelDistance: undefined,
      maxTravelDistance: undefined,
      minTravelDuration: undefined,
      maxTravelDuration: undefined,
      aspects: undefined
    };
    this.applyFilters();
  }

  sortTours(): void {
    if (!this.tours) return;

    const sortOption = Number(this.sortOption) as SortingCriteria;

    switch (sortOption) {
      case SortingCriteria.DISTANCE:
        this.tours.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        break;
      case SortingCriteria.DURATION:
        this.tours.sort((a, b) => (a.duration || 0) - (b.duration || 0));
        break;
      case SortingCriteria.METER_OF_ELEVATION:
        this.tours.sort((a, b) => (a.metersOfElevation || 0) - (b.metersOfElevation || 0));
        break;
      case SortingCriteria.DIFFICULTY:
        this.tours.sort((a, b) => (a.difficulty || 0) - (b.difficulty || 0));
        break;
      case SortingCriteria.RISK:
        this.tours.sort((a, b) => (a.risk || 0) - (b.risk || 0));
        break;
      case SortingCriteria.TRAVEL_DISTANCE:
        this.tours.sort((a, b) => (a.travelDetails?.travelDistance || 0) - (b.travelDetails?.travelDistance || 0));
        break;
      case SortingCriteria.TRAVEL_DURATION:
        this.tours.sort((a, b) => (a.travelDetails?.travelTime || 0) - (b.travelDetails?.travelTime || 0));
        break;
      default:
        break;
    }

    if (this.map) {
      this.addMarkers();
    }
  }

  showTourDetails(tour: ITour): void {
    this.openTour.emit(tour);
    console.log(`Details of tour ${tour.name} passed on.`)
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    if (this.tours) {
      this.addMarkers();
    }
  }

  private applyFilters(): void {
    if (!this.allTours) return;

    this.tours = this.toursSvc.getFilteredTours(this.location, this.filters, this.allTours);
    this.sortTours();
  }

  private addMarkers(): void {
    if (!this.tours || !this.map) {
      return;
    }

    // Clear existing markers first
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map?.removeLayer(layer);
      }
    });

    const bounds = new L.LatLngBounds([]);

    if (this.location) {
      const markerLocation = latLng(this.location.latitude, this.location.longitude);
      bounds.extend(markerLocation);
      this.addMarkerToMap(this.location, -1);
    }

    for (const [idx, tour] of this.tours.entries()) {
      let location: GPSLocation | null = tour.activityLocation || tour.startingLocation;

      if (!location) {
        continue;
      }
      const markerLocation = latLng(location.latitude, location.longitude);
      bounds.extend(markerLocation);
      this.addMarkerToMap(location, idx);
    }

    if (bounds.isValid()) {
      this.map.fitBounds(bounds, { padding: [20, 20] });
    }
  }

  private addMarkerToMap(location: GPSLocation, index: number): void {
    if (!this.map || !this.tours)
      return;

    if (index === -1) {
      const targetMarker = marker([location.latitude, location.longitude], {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      });
      targetMarker.addTo(this.map).on('click', (e) => this.markerOnClick(index));
    }
    else {
      const color: string = this.tours[index].risk != null ? TourPreviewComponent.getRiskColor(this.tours[index].risk) : ' #4e4e4e';

      const icon: L.DivIcon = divIcon({
        className: 'custom-marker',
        html: `<div class="marker-circle" style="background-color:${color}">
             <span class="marker-text">${index + 1}</span>
           </div>`,
        iconSize: [30, 30], // Adjust size as needed
        iconAnchor: [15, 15], // Ensure the marker is centered correctly
      });

      const targetMarker = marker([location.latitude, location.longitude], {
        icon: icon,
      });
      targetMarker.addTo(this.map).on('click', (e) => this.markerOnClick(index));
    }
  }

  private markerOnClick(index: number): void {
    if (index !== -1) {
      this.scrollToTour(index);
    }
  }

  private scrollToTour(index: number): void {
    const tourElements = this.tourItems?.toArray();
    if (!tourElements || !tourElements[index])
      return;

    const tourElement = tourElements[index].nativeElement;
    const isFirst = index === 0;
    const isLast = index === tourElements.length - 1;
    tourElement.scrollIntoView({
      behavior: 'smooth',
      block: isFirst ? 'start' : isLast ? 'end' : 'center'
    });
  }
}