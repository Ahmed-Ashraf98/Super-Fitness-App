import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './core/auth/auth.routes';

export const appRoutes: Routes = [
 {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    children: AUTH_ROUTES, 
  },
];
