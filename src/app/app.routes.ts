import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    //ruta prinncipal
    path: '',
    loadChildren: () => import('./pages/tabs-folder/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    //ruta al itinerario
    path: 'flujo-itinerario',
      loadComponent: () => import('./pages/flujo-itinerario/flujo-itinerario.component')
      .then(m => m.FlujoItinerarioComponent)
  },
  /*
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs-folder/tabs/tabs.routes').then(m => m.routes)
  },
  */
];
