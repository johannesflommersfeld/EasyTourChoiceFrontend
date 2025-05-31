import { Component, ViewChild } from '@angular/core';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'etc-root',
  imports: [SiteHeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(SiteHeaderComponent) header!: SiteHeaderComponent;

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.header.headerClicked.subscribe(() => {
      this.dialog.closeAll();
    });
  }
}
