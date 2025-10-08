import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonicModule, CommonModule,IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class Tab3Page {
  
  user: any;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }

  onButtonClick() {
    console.log('Botón presionado');
  }
}
