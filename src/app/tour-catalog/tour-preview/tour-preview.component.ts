import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KilometersPipe } from './kilometers.pipe';
import { RouterModule } from '@angular/router';
import { ITour } from './tour-data/tour.model';
import { ActivityPipe } from "./activity.pipe";


@Component({
  selector: 'etc-tour-preview',
  imports: [KilometersPipe, RouterModule, ActivityPipe],
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
