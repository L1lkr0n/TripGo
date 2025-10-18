import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    // Si la aplicación se inicia y no estamos ya en la página de Tabs
    // Puedes forzar la navegación después de un pequeño retraso si es necesario
    this.router.navigate(['/src/app/tabs/tab1']); 
    // O si tu ruta de Tabs tiene un path claro (ej. '/tabs/home'):
    // this.router.navigate(['/tabs/home']); 
  }
}