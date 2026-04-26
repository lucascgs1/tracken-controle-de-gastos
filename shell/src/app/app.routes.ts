import { Route } from '@angular/router';
import { LoginComponent } from './pages/login';

export const appRoutes: Route[] = [
	{
		path: 'settings',
		loadChildren: () => import('settings/settings.routes').then((m) => m?.settingsRoutes),
	},
	{
		path: 'auth/login',
		component: LoginComponent,
	},
	{
		path: 'dashboard',
		loadChildren: () =>
			import('dashboard/dashboardIntegrationRoutes').then((m) => m?.dashboardIntegrationRoutes),
	},
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
];
