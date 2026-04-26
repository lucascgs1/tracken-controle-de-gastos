import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideDataAccess } from '@tracken/data-access';
import { environment } from '../environments/environment';
import { provideTrackenTransloco } from '@tracken/shared';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { GlobalErrorHandler, httpErrorInterceptor } from '@tracken/shared';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		provideDataAccess(environment.firebase),
		provideHttpClient(withInterceptors([httpErrorInterceptor])),
		provideTrackenTransloco(),
		{ provide: ErrorHandler, useClass: GlobalErrorHandler },
	],
};
