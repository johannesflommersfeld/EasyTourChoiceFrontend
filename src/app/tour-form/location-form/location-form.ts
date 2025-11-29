import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IGPSLocationForForm } from '../../../lib/domain/tour-data/gps-location';

@Component({
  selector: 'app-location-form',
  imports: [
    Field,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './location-form.html',
  styleUrl: './location-form.scss'
})
export class LocationFormComponent {
  location = input.required<FieldTree<IGPSLocationForForm>>();
}