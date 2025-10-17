import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class Tab3Page {
  
  user: any;

  constructor(private router: Router) {
  }

  onButtonClick() {
    console.log('Botón presionado');
  }
}
