import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterValues } from '../../lib/domain/tour-data/filter-values';

@Component({
  selector: 'app-tour-catalog',
  imports: [],
  templateUrl: './tour-catalog.html',
  styleUrl: './tour-catalog.scss'
})
export class TourCatalogComponent implements OnInit {
  filters: FilterValues | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.currentNavigation();
    if (navigation?.extras?.state) {
      this.filters = navigation.extras.state['filters'] as FilterValues;
      console.log('Received filters:', this.filters);
      // Process filters here
    }
  }
}