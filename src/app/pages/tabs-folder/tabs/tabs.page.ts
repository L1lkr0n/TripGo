import { Component, EnvironmentInjector, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { SHARED_IMPORTS } from 'src/app/shared/shared-module';

// Importar los iconos específicos
import { homeOutline,personOutline,addCircleOutline } from 'ionicons/icons';

// Registrar iconos
addIcons({
  'home-outline': homeOutline,
  'person-outline': personOutline,
  'add-circle-outline': addCircleOutline
});

@Component({
  standalone: true,
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [SHARED_IMPORTS],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ triangle, ellipse, square });
  }
}
