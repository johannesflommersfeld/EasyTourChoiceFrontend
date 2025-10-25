import { Component, effect, input, output } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import L, { divIcon, Icon, icon, latLng, Map as LeafletMap, marker } from 'leaflet';
import { GPSLocation } from '../../domain/tour-data/gps-location';
import { ITour } from '../../../lib/domain/tour-data/tour';
import { TourPreviewTileComponent } from '../tour-preview-tile/tour-preview-tile';

// TODO: extract interactive components into directive
@Component({
  selector: 'app-map',
  imports: [LeafletModule],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class MapComponent {
  tours = input.required<ITour[] | undefined>();
  location = input<GPSLocation | undefined>();

  protected tourSelected = output<number>();
  mapReady = output<LeafletMap>();

  protected map: LeafletMap | undefined;

  private bounds = new L.LatLngBounds([]);

  constructor() {
    effect(() => {
      this.bounds = new L.LatLngBounds([]);
      this.clear();

      const location = this.location();
      if (location) {
        this.addLocation(location);
      }
      
      if (this.tours()){
        this.addTours();
      }

      if (this.map) {
        if (this.bounds.isValid()) {
          this.map.fitBounds(this.bounds, { padding: [20, 20], maxZoom: 9 });
        }
        this.mapReady.emit(this.map);
      }
    });
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    });
    tileLayer.addTo(map);
    this.mapReady.emit(this.map);
  }

  addMarkerToMap(location: GPSLocation, icon: L.Icon<L.IconOptions> | L.DivIcon,  action: (() => void) | undefined): void {
    if (!this.map || !location.latitude || !location.longitude)
      return;

    const markerLocation = latLng(location.latitude, location.longitude);
    this.bounds.extend(markerLocation);
    this.map.fitBounds(this.bounds, { maxZoom: 10 });

    const targetMarker = marker([location.latitude, location.longitude], { icon: icon });
    if (action) {
      targetMarker.addTo(this.map).on('click', action);
    }
    else {
      targetMarker.addTo(this.map);
    }
  }

  clear() {
    this.map?.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map?.removeLayer(layer);
      }
    });
  }

  private addLocation(location: GPSLocation) {
    if (location.latitude && location.longitude) {
      const iconSettings = icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon-red.png',
          iconRetinaUrl: 'assets/marker-icon-2x-red.png',
          shadowUrl: 'assets/marker-shadow.png'
        });
      this.addMarkerToMap(location, iconSettings, undefined);
    }
  }

  private addTours() {
    if (!this.tours() || !this.map) {
      return;
    }

    for (const [idx, tour] of this.tours()!.entries()) {
      const location: GPSLocation | null = tour.activityLocation || tour.startingLocation;

      if (!location?.latitude || !location?.longitude) {
        continue;
      }

      const risk = this.tours() && idx < this.tours()!.length ? this.tours()![idx].risk : null;
      const color: string = risk ? TourPreviewTileComponent.getRiskColor(risk) : '#4e4e4e';
      const customIcon: L.DivIcon = divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-circle" style="background-color: ${color};">
            <span class="marker-text">${idx + 1}</span>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      });
      this.addMarkerToMap(location, customIcon, () => this.markerOnClick(idx));
    }
  }

  private markerOnClick(index: number): void {
    this.tourSelected.emit(index);
  }
}