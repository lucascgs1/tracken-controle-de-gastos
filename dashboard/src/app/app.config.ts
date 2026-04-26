import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideDataAccess } from '@tracken/data-access';
import { environment } from '../environments/environment';
import { provideTrackenTransloco } from '@tracken/shared';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		provideDataAccess(environment.firebase),
		provideHttpClient(),
		provideTrackenTransloco(),
	],
};
