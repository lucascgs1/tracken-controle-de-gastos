import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { SettingsComponent } from './app/settings';

bootstrapApplication(SettingsComponent, appConfig).catch((err) => console.error(err));
