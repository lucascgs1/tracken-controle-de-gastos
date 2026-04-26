import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDataAccess } from '@tracken/data-access';
import { provideTrackenTransloco, GlobalErrorHandler, httpErrorInterceptor } from '@tracken/shared';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { settingsRoutes } from './settings.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(settingsRoutes),
		provideDataAccess(environment.firebase),
		provideHttpClient(withInterceptors([httpErrorInterceptor])),
		provideTrackenTransloco(),
		{ provide: ErrorHandler, useClass: GlobalErrorHandler },
	],
};
