import { Directive, inject, input, OnInit } from "@angular/core";
import { MapComponent } from "./map";
import { Icon, icon } from "leaflet";
import { GPSLocation } from "../../domain/tour-data/gps-location";

@Directive({
  selector: '[appRouteIndication]',
})
export class RouteIndicationDirective implements OnInit {
  private mapComponent = inject(MapComponent);

  route = input<GPSLocation[] | null | undefined>(undefined);
  parkingLocation = input<GPSLocation | undefined>(undefined);

  private readonly parkingIcon = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'assets/marker-icon-green.png',
    iconRetinaUrl: 'assets/marker-icon-2x-green.png',
    shadowUrl: 'assets/marker-shadow.png'
  });

  ngOnInit() {
    this.mapComponent.mapReady.subscribe(() => {
      const location = this.mapComponent.location();
      if (location) {
        this.mapComponent.addLocation(location);
      }
      const parkingLocation = this.parkingLocation();
      if (parkingLocation) {
        this.mapComponent.addMarkerToMap(parkingLocation, this.parkingIcon, undefined);
      }
      const route = this.route();
      if (route) {
        this.mapComponent.addTourToMap(route);
      }
    });
  }
}