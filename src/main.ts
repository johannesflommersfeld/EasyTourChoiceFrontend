import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// TODO: This is a dirty hack. See if AOT compilation works for the interactive marker component.
// might however also solve itself once everything is updated to angular 21
import '@angular/compiler'

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
