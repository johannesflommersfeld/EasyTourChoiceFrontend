import { Directive, effect, inject, input, linkedSignal, OnInit, output, ViewContainerRef } from "@angular/core";
import { GPSLocation } from "../../domain/tour-data/gps-location";
import { MapComponent } from "./map";
import L, { Icon, icon, Map as LeafletMap, LeafletMouseEvent } from 'leaflet';
import { PopupComponent } from "./popup/popup";

@Directive({
  selector: '[appInteractiveMarkers]',
})
export class InteractiveMarkersDirective implements OnInit {
  private mapComponent = inject(MapComponent);
  private vcr = inject(ViewContainerRef);

  secondaryLocation = input<GPSLocation | undefined>(undefined);
  primaryLocation = input<GPSLocation | undefined>(undefined);

  protected primaryLocationChanged = output<GPSLocation>();
  protected secondaryLocationChanged = output<GPSLocation>();

  private primaryLocationInternal =  linkedSignal(() => this.primaryLocation());
  private secondaryLocationInternal = linkedSignal(() => this.secondaryLocation());

  private readonly primaryIcon = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'assets/marker-icon-red.png',
    iconRetinaUrl: 'assets/marker-icon-2x-red.png',
    shadowUrl: 'assets/marker-shadow.png'
  });

  private readonly secondaryIcon = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'assets/marker-icon-green.png',
    iconRetinaUrl: 'assets/marker-icon-2x-green.png',
    shadowUrl: 'assets/marker-shadow.png'
  });

  constructor() {
    effect(() => {
      const primaryLocation = this.primaryLocationInternal();
      const secondaryLocation = this.secondaryLocationInternal();
      this.mapComponent.clear();
      if (primaryLocation) {
        this.mapComponent.addMarkerToMap(primaryLocation, this.primaryIcon, undefined);
        this.primaryLocationChanged.emit(primaryLocation);
      }
      if (secondaryLocation) {
        this.mapComponent.addMarkerToMap(secondaryLocation, this.secondaryIcon, undefined);
        this.secondaryLocationChanged.emit(secondaryLocation);
      }
    });
  }

  ngOnInit() {
    this.mapComponent.mapReady.subscribe(map => {
      const bounds = new L.LatLngBounds([]);
      bounds.extend({lat: 48, lng: 11});
      map.fitBounds(bounds, { maxZoom: 8 });
      this.enableMarkerPlacement(map);
    });
  }

  private enableMarkerPlacement(map: LeafletMap) {
    map.on('click', (e: LeafletMouseEvent) => {
      const componentRef = this.vcr.createComponent(PopupComponent);

      componentRef.instance.primaryClick.subscribe(() => {
        this.primaryLocationInternal.set(new GPSLocation(e.latlng.lat, e.latlng.lng));
        popup.remove();
      });
      
      componentRef.instance.secondaryClick.subscribe(() => {
        this.secondaryLocationInternal.set(new GPSLocation(e.latlng.lat, e.latlng.lng));
        popup.remove();
      });
      
      const popup = L.popup({ closeButton: false })
      .setLatLng(e.latlng)
      .setContent(componentRef.location.nativeElement)
      .openOn(map);

      popup.on('remove', () => componentRef.destroy());
    });
  }
}