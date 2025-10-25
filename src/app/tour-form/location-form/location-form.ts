import { Component, input } from '@angular/core';
import { Control, Field } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GPSLocation } from '../../../lib/domain/tour-data/gps-location';

@Component({
  selector: 'app-location-form',
  imports: [
    Control,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './location-form.html',
  styleUrl: './location-form.scss'
})
export class LocationFormComponent {
  location = input.required<Field<GPSLocation>>();
}