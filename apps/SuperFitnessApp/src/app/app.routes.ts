import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: 'classes', loadComponent: () => import('./core/pages/classes/classes.component').then((c) => c.ClassesComponent) }
];
