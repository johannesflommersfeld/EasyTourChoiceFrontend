import { Component } from '@angular/core';
import { ActivitySelectorComponent } from '../../lib/ui/activity-selector/activity-selector';

@Component({
  selector: 'app-home',
  imports: [ActivitySelectorComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {}