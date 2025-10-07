import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "tripgo-473722", 
      appId: "1:274317341753:web:df2db939821dca824ec9e8", 
      storageBucket: "tripgo-473722.firebasestorage.app", 
      apiKey: "AIzaSyA7Fen_mTkdzDY7spPh0Kp-uU4Hn7INNrY", 
      authDomain: "tripgo-473722.firebaseapp.com", 
      messagingSenderId: "274317341753", 
      measurementId: "G-RBPQ0N0PXF", 
       })), 
      provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideVertexAI(() => getVertexAI())
  ],
});
