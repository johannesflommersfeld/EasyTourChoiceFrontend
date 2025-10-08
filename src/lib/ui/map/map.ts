import { Component, effect, input, output } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import L, { divIcon, Icon, icon, latLng, Map as LeafletMap, marker } from 'leaflet';
import { GPSLocation } from '../../domain/tour-data/gps-location';
import { Tour } from '../../../lib/domain/tour-data/tour';
import { TourPreviewTileComponent } from '../tour-preview-tile/tour-preview-tile';

@Component({
  selector: 'app-map',
  imports: [LeafletModule],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class MapComponent {
  tours = input<Tour[] | undefined>();
  location = input<GPSLocation | undefined>();
  tourSelected = output<number>();

  protected map: LeafletMap | undefined;

  // Watch for changes in tours and update markers
  private tourEffect = effect(() => {
    // Access tours, location, and map to trigger effect when either changes
    const tours = this.tours();
    const location = this.location();
    const map = this.map;
    
    if (tours && map) {
      this.addMarkers();
    }
  });

  onMapReady(map: LeafletMap) {
    this.map = map;
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    });
    tileLayer.addTo(map);
    
    if (this.tours()) {
      this.addMarkers();
    }
  }

  private addMarkers(): void {
    if (!this.tours() || !this.map) {
      return;
    }

    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map?.removeLayer(layer);
      }
    });

    const bounds = new L.LatLngBounds([]);

    if (this.location()) {
      const markerLocation = latLng(this.location()!.latitude, this.location()!.longitude);
      bounds.extend(markerLocation);
      this.addMarkerToMap(this.location()!, -1);
    }

    for (const [idx, tour] of this.tours()!.entries()) {
      const location: GPSLocation | null = tour.activityLocation || tour.startingLocation;

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
    if (!this.map)
      return;

    if (index === -1) {
      const targetMarker = marker([location.latitude, location.longitude], {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon-red.png',
          iconRetinaUrl: 'assets/marker-icon-2x-red.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      });
      targetMarker.addTo(this.map).on('click', (e) => this.markerOnClick(index));
    }
    else {
      const risk = this.tours() && index < this.tours()!.length ? this.tours()![index].risk : null;
      const color: string = risk ? TourPreviewTileComponent.getRiskColor(risk) : '#4e4e4e';

      const customIcon: L.DivIcon = divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-circle" style="background-color: ${color};">
            <span class="marker-text">${index + 1}</span>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      });

      const targetMarker = marker([location.latitude, location.longitude], {
        icon: customIcon,
      });
      targetMarker.addTo(this.map).on('click', (e) => this.markerOnClick(index));
    }
  }

  private markerOnClick(index: number): void {
    if (index !== -1) {
      this.tourSelected.emit(index);
    }
  }
}
