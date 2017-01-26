import 'reflect-metadata';
import 'core-js';
import 'zone.js/dist/zone';
import 'angular2-moment'
import 'hammerjs'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './module';

document.addEventListener('DOMContentLoaded', function main(): void {
  platformBrowserDynamic().bootstrapModule(AppModule);
});