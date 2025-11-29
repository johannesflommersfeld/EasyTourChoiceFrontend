import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-popup',
  imports: [MatButtonModule],
  templateUrl: './popup.html',
  styleUrl: './popup.scss'
})
export class PopupComponent {
  primaryClick = output<void>();
  secondaryClick = output<void>();

  handlePrimaryClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.primaryClick.emit();
  }

  handleSecondaryClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.secondaryClick.emit();
  }
}