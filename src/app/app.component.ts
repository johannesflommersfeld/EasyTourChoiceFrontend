import { Component } from '@angular/core';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'etc-root',
  imports: [SiteHeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
