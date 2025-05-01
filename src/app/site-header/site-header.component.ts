import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'etc-site-header',
  imports: [RouterModule],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss'
})
export class SiteHeaderComponent {
  @Output() headerClicked = new EventEmitter<void>();

  onHeaderClick() {
    this.headerClicked.emit();
  }
}
