import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

export const routes: Routes = [

  {
    //ruta prinncipal
    path: '',
    loadChildren: () => import('./pages/tabs-folder/tabs/tabs.routes').then((m) => m.routes),
  },
  /*
  {
       path: 'login',
       loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage), // Lazy loading para standalone
  },
  /*
  {
    //ruta prinncipal
    path: '',
    loadChildren: () => import('./pages/tabs-folder/tabs/tabs.routes').then((m) => m.routes),
  },
  /*
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    canActivate: [AuthGuard] // 🔒 Protegemos las tabs
  },
  */
  {
    //ruta al itinerario
    path: 'flujo-itinerario',
      loadComponent: () => import('./pages/flujo-itinerario/flujo-itinerario.component')
      .then(m => m.FlujoItinerarioComponent)
  },
];
