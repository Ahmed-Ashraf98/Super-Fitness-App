import { ApplicationConfig, importProvidersFrom, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { HeaderInterceptor } from './core/auth/interceptors/header.interceptor';
import { appInit } from './shared/utils/app.utils';
import { httpLoaderFactory } from './shared/utils/translateUtils';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(appInit),
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.dark' },
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
};
