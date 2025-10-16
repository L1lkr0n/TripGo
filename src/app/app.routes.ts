import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs-folder/tabs/tabs.routes').then(m => m.routes)
  },
  {
    //ruta al itinerario
    path: 'flujo-itinerario',
      loadComponent: () => import('./pages/flujo-itinerario/flujo-itinerario.component')
      .then(m => m.FlujoItinerarioComponent)
  }
  /*
   {
    //ruta prinncipal
    path: '',
    loadChildren: () => import('./pages/tabs-folder/tabs/tabs.routes').then((m) => m.routes),
  },
  
  */
];