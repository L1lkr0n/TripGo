import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs-folder/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'flujo-itinerario',
      loadComponent: () => import('./pages/flujo-itinerario/flujo-itinerario.component')
      .then(m => m.FlujoItinerarioComponent)
  },
];
