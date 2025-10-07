import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {  } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// Registrar iconos
addIcons({

});
@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class Tab2Page {
  constructor(private router : Router) {}

  abrirFlujo() {
  this.router.navigate(['flujo-itinerario']);
}

}
