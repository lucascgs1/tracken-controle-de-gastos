import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDataAccess } from '@tracken/data-access';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideTrackenTransloco } from '@tracken/shared';
import { settingsRoutes } from './settings.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(settingsRoutes),
		provideDataAccess(environment.firebase),
		provideHttpClient(),
		provideTrackenTransloco(),
	],
};
