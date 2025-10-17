import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [ FormsModule, CommonModule, IonicModule],
})
export class LoginPage {

  constructor( private router: Router) {}
  
}