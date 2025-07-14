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
  },{
        path: 'home',
        loadComponent: () =>
          import('./shared/components/home/home.component').then((c) => c.HomeComponent),
      },
     {
        path: 'about',
        loadComponent: () =>
          import('./shared/components/about-us/about-us.component').then((c) => c.AboutUsComponent),
      },
];
