import { Route } from '@angular/router';
import { LoginComponent } from './pages/login';
import { authGuard } from '@tracken/data-access';

export const appRoutes: Route[] = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    // canActivate: [authGuard],
    loadChildren: () => import('dashboard/Routes').then((m) => m!.dashboardRoutes),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];
