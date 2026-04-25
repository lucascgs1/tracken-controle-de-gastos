import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { DashboardIntegrationComponent } from './app/integration/dashboard-integration.component';

bootstrapApplication(DashboardIntegrationComponent, appConfig).catch((err) =>
  console.error(err),
);
