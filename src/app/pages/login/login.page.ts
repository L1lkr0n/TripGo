import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [FormsModule, CommonModule, IonicModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      const toast = await this.toastCtrl.create({
        message: 'Inicio de sesión exitoso',
        duration: 1500,
        color: 'success',
      });
      toast.present();
      this.router.navigate(['/tabs']); // o donde quieras redirigir
    } catch (error: any) {
      const toast = await this.toastCtrl.create({
        message: error.message,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
