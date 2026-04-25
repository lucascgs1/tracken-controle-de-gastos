import { Route } from '@angular/router';
import { DashboardIntegrationComponent } from './dashboard-integration.component';
import { provideDataAccess } from '@tracken/data-access';
import { environment } from '../../environments/environment';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardIntegrationComponent,
    providers: [
      // Provide data access as a remote to inherit Shell's infrastructure
      provideDataAccess(environment.firebase, { isRemote: true })
    ]
  },
];
