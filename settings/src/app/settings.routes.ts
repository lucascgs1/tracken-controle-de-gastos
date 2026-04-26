import { Route } from '@angular/router';
import { provideDataAccess } from '@tracken/data-access';
import { environment } from '../environments/environment';

export const settingsRoutes: Route[] = [
	{
		path: '',
		loadComponent: () => import('./settings').then((m) => m.SettingsComponent),
		providers: [provideDataAccess(environment.firebase, { isRemote: true })],
		children: [
			{
				path: 'profile',
				loadComponent: () =>
					import('./pages/profile/profile.component').then((m) => m.ProfileSettingsComponent),
			},
			{
				path: 'security',
				loadComponent: () =>
					import('./pages/security/security.component').then((m) => m.SecuritySettingsComponent),
			},
			{
				path: 'appearance',
				loadComponent: () =>
					import('./pages/appearance/appearance.component').then(
						(m) => m.AppearanceSettingsComponent,
					),
			},
		],
	},
];
