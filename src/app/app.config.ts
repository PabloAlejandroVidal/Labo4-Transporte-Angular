import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../enviroments/environment';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync(),
     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
       provideAuth(() => getAuth()),
       provideFirestore(() => getFirestore()),
       provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()
      ]
};
