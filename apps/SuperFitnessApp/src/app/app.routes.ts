import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './core/auth/auth.routes';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/pages/about-us/about-us.component').then(
        (c) => c.AboutUsComponent
      ),
  },
  {
    path: 'classes',
    loadComponent: () =>
      import('./features/pages/fitness-class/fitness-class.component').then(
        (c) => c.FitnessClassComponent
      ),
  },
];
