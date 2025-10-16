import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [ FormsModule, CommonModule, IonicModule],
})
export class LoginPage {
  
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin() {
    console.log('Intentando login con:', this.email, 'y contraseña:', this.password);
    const success = await this.auth.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/tabs']);
    }else {
      alert('Error en el login. Por favor, verifica tus credenciales.');
    }
  }

  async register() {
    await this.auth.register(this.email, this.password);
    alert('Usuario registrado!');
  }
}