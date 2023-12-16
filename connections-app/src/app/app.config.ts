import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from './core/services/snackbar.service';
import { AuthService } from './auth/services/auth.service';
import { provideStore } from '@ngrx/store';
import { httpInterceptorProviders } from './http-interceptors';
import { userReducer } from './store/reducers/user.reducers';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { LoginEffects } from './store/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withPreloading(PreloadAllModules)), provideAnimations(), { provide: AuthService },
    importProvidersFrom([HttpClientModule, MatSnackBarModule, SnackBarService,]), 
    provideStore({ user: userReducer }), httpInterceptorProviders, provideEffects([LoginEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
    })]
};
