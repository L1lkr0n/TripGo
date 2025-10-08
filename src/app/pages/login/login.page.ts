import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class LoginPage {
  
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin() {
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión');
    }
  }
}
