import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ITour } from '../models/tour-data/tour.model';
import { RiskLevel } from '../models/tour-data/risk-level.model';
import { Activity } from '../models/tour-data/activity.model';
import { GeneralDifficulty } from '../models/tour-data/general-difficulty.model';
import { ToursService } from '../tours.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GPSLocation } from '../models/tour-data/gps-location.model';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import L, { latLng, Layer, tileLayer, Map as LeafletMap, LatLng } from 'leaflet';
import { Aspect } from '../models/tour-data/aspect.model';
import { AspectPickerComponent } from "./aspect-picker/aspect-picker.component";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'etc-tour-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LeafletModule, AspectPickerComponent, MatButtonModule],
  templateUrl: './tour-form.component.html',
  styleUrl: './tour-form.component.scss'
})
export class TourFormComponent implements OnInit {
  Activity = Activity;
  RiskLevel = RiskLevel;
  GeneralDifficulty = GeneralDifficulty;

  // Calculate min and max values from enums
  riskLevelMin = Math.min(...Object.keys(RiskLevel).filter(k => !isNaN(Number(k))).map(Number));
  riskLevelMax = Math.max(...Object.keys(RiskLevel).filter(k => !isNaN(Number(k))).map(Number));

  difficultyMin = Math.min(...Object.keys(GeneralDifficulty).filter(k => !isNaN(Number(k))).map(Number));
  difficultyMax = Math.max(...Object.keys(GeneralDifficulty).filter(k => !isNaN(Number(k))).map(Number));

  riskLevelText: string = '';
  difficultyLevelText: string = '';

  // Leaflet map properties
  map: LeafletMap | null = null;
  startingLocationMarker: L.Marker | null = null;
  activityLocationMarker: L.Marker | null = null;
  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  contextMenuLatLng: LatLng | null = null;

  // Leaflet map options
  mapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
    ] as Layer[],
    zoom: 8,
    center: latLng(46, 7) // Default center (Switzerland)
  };

  gpxFile: File | null = null;
  gpxFileName: string = '';

  isEditMode = false;
  tourId: number | null = null;
  originalTour: ITour | null = null;

  formTitle = 'Add New Tour';

  tourForm = new FormGroup({
    activity: new FormControl<Activity>(Activity.UNDEFINED),
    tourName: new FormControl<string>(''),
    shortDescription: new FormControl<string>(''),
    detailedDescription: new FormControl<string>(''),
    distance: new FormControl<number | null>(null),
    duration: new FormControl<number | null>(null),
    approachDuration: new FormControl<number | null>(null),
    elevationGain: new FormControl<number | null>(null),
    risk: new FormControl<RiskLevel>(RiskLevel.UNKNOWN),
    difficulty: new FormControl<GeneralDifficulty>(GeneralDifficulty.UNKNOWN),
    aspects: new FormControl<Aspect>(Aspect.UNKNOWN),
    startingLocationLat: new FormControl<number | null>(null),
    startingLocationLng: new FormControl<number | null>(null),
    activityLocationLat: new FormControl<number | null>(null),
    activityLocationLng: new FormControl<number | null>(null),
    gpsTrack: new FormControl<string>(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toursSvc: ToursService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.updateRiskText();
    this.updateDifficultyText();

    this.tourForm.get('startingLocationLat')?.valueChanges.subscribe(() => this.updateStartingLocationMarker());
    this.tourForm.get('startingLocationLng')?.valueChanges.subscribe(() => this.updateStartingLocationMarker());
    this.tourForm.get('activityLocationLat')?.valueChanges.subscribe(() => this.updateActivityLocationMarker());
    this.tourForm.get('activityLocationLng')?.valueChanges.subscribe(() => this.updateActivityLocationMarker());

    this.route.paramMap.subscribe(params => {
      const tourId = params.get('tourId');
      if (tourId) {
        this.isEditMode = true;
        this.tourId = +tourId;
        this.formTitle = 'Edit Tour';
        this.loadTourData(+tourId);
      }
    });
  }

  loadTourData(tourId: number) {
    this.toursSvc.fetchTourById(tourId).subscribe(tour => {
      this.originalTour = { ...tour };

      this.tourForm.patchValue({
        activity: tour.activityType,
        tourName: tour.name,
        shortDescription: tour.shortDescription || '',
        distance: tour.distance,
        duration: tour.duration,
        approachDuration: tour.approachDuration,
        elevationGain: tour.metersOfElevation,
        risk: tour.risk || RiskLevel.UNKNOWN,
        difficulty: tour.difficulty || GeneralDifficulty.UNKNOWN,
        aspects: tour.aspect || Aspect.UNKNOWN,
        startingLocationLat: tour.startingLocation?.latitude || null,
        startingLocationLng: tour.startingLocation?.longitude || null,
        activityLocationLat: tour.activityLocation?.latitude || null,
        activityLocationLng: tour.activityLocation?.longitude || null,
      });

      this.updateRiskText();
      this.updateDifficultyText();
    });
  }

  updateRiskText(): void {
    const riskValue = this.tourForm.get('risk')?.value as RiskLevel;

    switch (riskValue) {
      case RiskLevel.UNKNOWN:
        this.riskLevelText = 'Unknown';
        break;
      case RiskLevel.VERY_SAFE:
        this.riskLevelText = 'Very Safe';
        break;
      case RiskLevel.SAFE:
        this.riskLevelText = 'Safe';
        break;
      case RiskLevel.MODERATE_RISK:
        this.riskLevelText = 'Moderate Risk';
        break;
      case RiskLevel.HIGH_RISK:
        this.riskLevelText = 'High Risk';
        break;
      case RiskLevel.DANGEROUS:
        this.riskLevelText = 'Dangerous';
        break;
      default:
        this.riskLevelText = 'Unknown';
    }
  }

  updateDifficultyText(): void {
    const difficultyValue = this.tourForm.get('difficulty')?.value as GeneralDifficulty;

    switch (difficultyValue) {
      case GeneralDifficulty.UNKNOWN:
        this.difficultyLevelText = 'Unknown';
        break;
      case GeneralDifficulty.EASY:
        this.difficultyLevelText = 'Easy';
        break;
      case GeneralDifficulty.MILDLY_CHALLENGING:
        this.difficultyLevelText = 'Mildly Challenging';
        break;
      case GeneralDifficulty.CHALLENGING:
        this.difficultyLevelText = 'Challenging';
        break;
      case GeneralDifficulty.VERY_CHALLENGING:
        this.difficultyLevelText = 'Very Challenging';
        break;
      default:
        this.difficultyLevelText = 'Unknown';
    }
  }

  // Map functions
  onMapReady(map: LeafletMap) {
    this.map = map;

    // Set up right-click (context menu) event
    this.map.on('contextmenu', (e: L.LeafletMouseEvent) => {
      // Prevent the browser's context menu
      L.DomEvent.preventDefault(e.originalEvent);

      // Store the clicked location
      this.contextMenuLatLng = e.latlng;

      // Calculate position relative to the map container
      const rect = document.querySelector('.location-map-wrapper')?.getBoundingClientRect();
      if (rect) {
        this.contextMenuPosition = {
          x: e.originalEvent.clientX - rect.left,
          y: e.originalEvent.clientY - rect.top
        };
        this.contextMenuVisible = true;
        // Manually trigger change detection
        this.cdr.detectChanges();
      }
    });

    // Hide context menu when clicking elsewhere
    this.map.on('click', () => {
      this.contextMenuVisible = false;
    });

    // Also hide context menu when user clicks outside the map
    document.addEventListener('click', (e) => {
      const mapWrapper = document.querySelector('.location-map-wrapper');
      if (mapWrapper && !mapWrapper.contains(e.target as Node)) {
        this.contextMenuVisible = false;
      }
    });

    // Check if coordinates are already set and add markers
    this.updateStartingLocationMarker();
    this.updateActivityLocationMarker();
  }

  setLocationFromContextMenu(locationType: 'starting' | 'activity') {
    if (!this.contextMenuLatLng) return;

    if (locationType === 'starting') {
      this.tourForm.patchValue({
        startingLocationLat: this.contextMenuLatLng.lat,
        startingLocationLng: this.contextMenuLatLng.lng
      });
    } else {
      this.tourForm.patchValue({
        activityLocationLat: this.contextMenuLatLng.lat,
        activityLocationLng: this.contextMenuLatLng.lng
      });
    }

    this.contextMenuVisible = false;
  }

  updateStartingLocationMarker() {
    if (!this.map) return;

    const lat = this.tourForm.get('startingLocationLat')?.value;
    const lng = this.tourForm.get('startingLocationLng')?.value;

    // Remove existing marker if any
    if (this.startingLocationMarker) {
      this.map.removeLayer(this.startingLocationMarker);
      this.startingLocationMarker = null;
    }

    // Add new marker if coordinates are valid
    if (lat && lng) {
      this.startingLocationMarker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: 'assets/marker-icon-green.png', // Green marker for starting location
          iconRetinaUrl: 'assets/marker-icon-2x-green.png',
          shadowUrl: 'assets/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      });

      this.startingLocationMarker.addTo(this.map)
        .bindPopup('Starting Location')
        .on('click', () => this.startingLocationMarker?.openPopup());

      // Fit bounds if both markers are present
      this.fitMapBounds();
    }
  }

  updateActivityLocationMarker() {
    if (!this.map) return;

    const lat = this.tourForm.get('activityLocationLat')?.value;
    const lng = this.tourForm.get('activityLocationLng')?.value;

    // Remove existing marker if any
    if (this.activityLocationMarker) {
      this.map.removeLayer(this.activityLocationMarker);
      this.activityLocationMarker = null;
    }

    // Add new marker if coordinates are valid
    if (lat && lng) {
      this.activityLocationMarker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: 'assets/marker-icon-red.png', // Red marker for activity location
          iconRetinaUrl: 'assets/marker-icon-2x-red.png',
          shadowUrl: 'assets/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      });

      this.activityLocationMarker.addTo(this.map)
        .bindPopup('Activity Location')
        .on('click', () => this.activityLocationMarker?.openPopup());

      // Fit bounds if both markers are present
      this.fitMapBounds();
    }
  }

  fitMapBounds() {
    if (!this.map) return;

    const bounds = new L.LatLngBounds([]);

    if (this.startingLocationMarker) {
      bounds.extend(this.startingLocationMarker.getLatLng());
    }

    if (this.activityLocationMarker) {
      bounds.extend(this.activityLocationMarker.getLatLng());
    }

    if (bounds.isValid()) {
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

  saveTour(): void {
    const formValues = this.tourForm.value;

    let startingLocation: GPSLocation | null = null;
    let activityLocation: GPSLocation | null = null;

    if (formValues.startingLocationLat && formValues.startingLocationLng) {
      startingLocation = new GPSLocation(
        formValues.startingLocationLat,
        formValues.startingLocationLng
      );
    }

    if (formValues.activityLocationLat && formValues.activityLocationLng) {
      activityLocation = new GPSLocation(
        formValues.activityLocationLat,
        formValues.activityLocationLng
      );
    }

    const tour: Partial<ITour> = {
      name: formValues.tourName || '',
      activityType: formValues.activity || Activity.UNDEFINED,
      shortDescription: formValues.shortDescription || null,
      distance: formValues.distance,
      duration: formValues.duration,
      approachDuration: formValues.approachDuration,
      metersOfElevation: formValues.elevationGain,
      risk: formValues.risk || RiskLevel.UNKNOWN,
      difficulty: formValues.difficulty || GeneralDifficulty.UNKNOWN,
      startingLocation: startingLocation,
      activityLocation: activityLocation,
      aspect: formValues.aspects || Aspect.UNKNOWN,
    };

    if (this.isEditMode && this.tourId && this.originalTour) {
      // For edit mode, we send a PATCH request with JSON Patch document
      console.log('Updating tour:', tour);
      this.toursSvc.patchTour(this.tourId, tour, this.originalTour).subscribe({
        next: () => this.router.navigate(['/tour-details', this.tourId])
      });
    } else {
      // For create mode, we send a POST request
      // Add fields required for new tour
      const newTour: Partial<ITour> = {
        ...tour,
        id: 0,
        startingLocationId: 0,
        activityLocationId: 0,
        areaId: null,
        weatherForecast: null,
        bulletin: null,
        travelDetails: null
      };

      console.log('Creating new tour:', newTour);
      this.toursSvc.putTour(newTour).subscribe({
        next: () => this.router.navigate(['/home'])
      });
    }
  }

  cancel(): void {
    if (this.isEditMode && this.tourId) {
      this.router.navigate(['/tour-details', this.tourId]);
    } else {
      this.router.navigate(['/tour-catalog']);
    }
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
  }

  delete(): void {
    if (this.tourId) {
      this.toursSvc.deleteTour(this.tourId).subscribe({
        next: () => this.router.navigate(['/tour-catalog'])
      });
    }
  }

  handleGpxFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.gpxFile = input.files[0];
      this.gpxFileName = this.gpxFile.name;

      // Read the GPX file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const gpxContent = e.target?.result as string;
        // Store the GPX content in the form
        this.tourForm.patchValue({
          gpsTrack: gpxContent
        });
        console.log('GPX file loaded:', this.gpxFileName);
      };
      reader.readAsText(this.gpxFile);
    }
  }
}
