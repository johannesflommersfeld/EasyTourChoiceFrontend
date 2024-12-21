import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITour } from './tour.model';
import { KilometersPipe } from './kilometers.pipe';


@Component({
  selector: 'etc-tour-preview',
  imports: [KilometersPipe],
  templateUrl: './tour-preview.component.html',
  styleUrl: './tour-preview.component.css'
})
export class TourPreviewComponent {
  @Input() tour!: ITour;
  @Output() open = new EventEmitter();

  getImageUrl(tour: ITour): string {
    // TODO: generate image with map preview
    return '/activities/hiking.png';
  }

  detailsButtonClicked(tour: ITour): void {
    this.open.emit();
    console.log(`Details of tour ${tour.name}.`)
  }
}
