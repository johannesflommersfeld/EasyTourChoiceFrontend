

import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-avalanche-report-details-tile',
  imports: [
    MatCardModule,
  ],
  templateUrl: './avalanche-report-details-tile.html',
  styleUrl: './avalanche-report-details-tile.scss'
})
export class AvalancheReportDetailsTile {
  title = input.required<string>();
  paragraphs = input.required<string[]>();
}
