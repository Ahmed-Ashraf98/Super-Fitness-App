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
  },{
        path: 'home',
        loadComponent: () =>
          import('./shared/components/main-page/main-page.component').then((c) => c.MainPageComponent),
      },
     {
        path: 'about',
        loadComponent: () =>
          import('./core/components/about-us/about-us.component').then((c) => c.AboutUsComponent),
      },
];
