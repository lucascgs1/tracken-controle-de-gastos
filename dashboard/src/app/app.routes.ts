import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./integration/dashboard-integration.routes').then((m) => m.dashboardIntegrationRoutes),
  },
];
