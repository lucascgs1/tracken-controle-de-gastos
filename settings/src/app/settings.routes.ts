import { Route } from '@angular/router';
import { SettingsComponent } from './settings';
import { provideDataAccess } from '@tracken/data-access';
import { environment } from '../environments/environment';

export const remoteRoutes: Route[] = [
	{
		path: '',
		component: SettingsComponent,
		providers: [provideDataAccess(environment.firebase, { isRemote: true })],
	},
];
