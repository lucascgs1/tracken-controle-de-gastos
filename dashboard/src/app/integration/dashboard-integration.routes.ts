import { Route } from '@angular/router';
import { DashboardIntegrationComponent } from './dashboard-integration.component';
import { provideDataAccess } from '@tracken/data-access';
import { environment } from '../../environments/environment';

export const dashboardIntegrationRoutes: Route[] = [
	{
		path: '',
		component: DashboardIntegrationComponent,
		providers: [
			provideDataAccess(environment.firebase, {
				isRemote: true,
			}),
		],
	},
];
