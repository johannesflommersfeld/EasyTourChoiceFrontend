import { Component } from '@angular/core';
import { TourCatalogComponent } from './tour-catalog/tour-catalog.component';
import { SiteHeaderComponent } from './site-header/site-header.component';

@Component({
  selector: 'etc-root',
  imports: [TourCatalogComponent, SiteHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
