import { Component } from '@angular/core';
import { IonContent,IonList,
  IonItem,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonLabel} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [ FormsModule, CommonModule, IonContent ,IonList,
  IonItem,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonLabel],
})
export class LoginPage {
  
  email = '';
  password = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor complete ambos campos.');
      return;
    }

    this.loading = true;
    try {
      await this.auth.login(this.email.trim(), this.password);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error: any) {
      console.error(error);
      alert(this.getFirebaseError(error.code));
    } finally {
      this.loading = false;
    }
  }
  getFirebaseError(code: string): string {
    switch (code) {
      case 'auth/user-not-found': return 'No hay usuario registrado con este correo.';
      case 'auth/wrong-password': return 'Contraseña incorrecta.';
      case 'auth/invalid-email': return 'Correo inválido.';
      default: return 'Error al iniciar sesión. Intente nuevamente.';
    }
  }
}