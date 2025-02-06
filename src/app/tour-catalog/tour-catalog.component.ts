import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TourPreviewComponent } from "./tour-preview/tour-preview.component";
import { ToursService } from '../tours.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Activity } from '../models/tour-data/activity.model';
import { ITour } from '../models/tour-data/tour.model';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import L, { icon, Icon, latLng, Layer, marker, tileLayer, Map as LeafletMap, MarkerOptions } from 'leaflet';
import { GPSLocation } from '../models/tour-data/gps-location.model';
import { LocationService } from '../location.service';

@Component({
  selector: 'etc-tour-catalog',
  imports: [NgFor, TourPreviewComponent, RouterModule, LeafletModule, CommonModule],
  templateUrl: './tour-catalog.component.html',
  styleUrl: './tour-catalog.component.css'
})
export class TourCatalogComponent {
  filters: Set<Activity> = new Set();
  tours: ITour[] | null = null;
  Activity = Activity;
  map: LeafletMap | null = null;
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
  private parameterToActivity: Map<string, Activity> = new Map([
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
  ]);

  constructor(
    private toursSvc: ToursService,
    private route: ActivatedRoute,
    private locationService: LocationService,
  ) { }

  async ngOnInit() {
    if (!this.location) {
      this.location = await this.locationService.getLocation();
    }

    this.route.queryParams.subscribe((params) => {
      this.filters = new Set<Activity>();
      let activity: Activity | undefined = this.parameterToActivity.get(params['filter']);
      if (activity != undefined) {
        this.filters.add(activity);
        this.setFilteredTours();
        this.addMarkers();
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

  private setFilteredTours(): void {
    this.tours = this.toursSvc.getFilteredTours(this.filters);
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    this.addMarkers();
  }

  private addMarkers(): void {
    if (!this.tours || !this.map) {
      return;
    }
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
      if (!bounds.isValid()) {
        return;
      }

      this.map.fitBounds(bounds, { padding: [20, 20] });
    }
  }

  private addMarkerToMap(location: GPSLocation, index: number): void {
    if (!this.map || !this.tours)
      return;

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