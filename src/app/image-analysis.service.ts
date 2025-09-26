import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tour } from './models/tour-data/tour.model';

@Injectable({
  providedIn: 'root'
})
export class ImageAnalysisService {
  constructor() {}

  fetchInfos(base64Image: string): HttpResourceRef<Tour | undefined> {
    return httpResource(() =>({
      url: `/magellang/extract-information/`,
      params: {
        image: base64Image
      }
    }));
  }
  // TODO: add functionality to report feedback
}
