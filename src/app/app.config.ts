import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

const httpLoaderFactory: (http: HttpClient) =>
  TranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, '/assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ]
};
