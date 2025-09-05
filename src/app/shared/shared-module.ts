import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class SharedModule {}