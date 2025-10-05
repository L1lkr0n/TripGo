import { Component } from '@angular/core';
import { SHARED_IMPORTS } from 'src/app/shared/shared-module';
import { addIcons } from 'ionicons';
import {  } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
// Registrar iconos
addIcons({

});
@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [SHARED_IMPORTS],
})
export class Tab2Page {
  constructor(private router : Router) {}

  abrirFlujo() {
  this.router.navigate(['flujo-itinerario']);
}

}
