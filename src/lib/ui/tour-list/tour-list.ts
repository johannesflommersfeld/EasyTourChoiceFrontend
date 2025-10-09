import { Component, input, output, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Tour } from '../../domain/tour-data/tour';
import { TourPreviewTileComponent } from '../tour-preview-tile/tour-preview-tile';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [TourPreviewTileComponent],
  templateUrl: './tour-list.html',
  styleUrl: './tour-list.scss'
})
export class TourListComponent {
  tours = input.required<Tour[] | undefined>();
  protected tourSelected = output<Tour>();

  @ViewChildren('tourItem') tourItems!: QueryList<ElementRef>;

  scrollToTour(index: number): void {
    const tourElements = this.tourItems?.toArray();
    if (!tourElements || !tourElements[index]) return;

    const tourElement = tourElements[index].nativeElement;
    const isFirst = index === 0;
    const isLast = index === tourElements.length - 1;
    
    tourElement.scrollIntoView({
      behavior: 'smooth',
      block: isFirst ? 'start' : isLast ? 'end' : 'center'
    });
  }

  protected onTourClick(tour: Tour): void {
    this.tourSelected.emit(tour);
  }
}
