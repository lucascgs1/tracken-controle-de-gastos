import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: '',
		loadChildren: () => import('./settings.routes').then((m) => m.remoteRoutes),
	},
];
