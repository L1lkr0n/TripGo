import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { ModalController } from '@ionic/angular';
import { DetailModalComponent } from 'src/app/detail-modal/detail-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [SharedModule],
})
export class Tab1Page {
  itinerary = [{ title: '', time: '', description: '', transport: '' }];

  constructor(private modalCtrl: ModalController, private router: Router) {}

  async openDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent,
      componentProps: { item: { ...this.itinerary[index] } },
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.itinerary[index] = res.data;

        // Si el usuario llenó algo y es el último card → crea uno nuevo vacío
        if (
          index === this.itinerary.length - 1 &&
          this.itinerary[index].title.trim() !== ''
        ) {
          this.itinerary.push({
            title: '',
            time: '',
            description: '',
            transport: '',
          });
        }
      }
    });

    await modal.present();
  }
  deleteCard(index: number) {
    if (this.itinerary.length > 1) {
      this.itinerary.splice(index, 1);
    }
  }

  // Agregar método que verifica si hay al menos un card lleno
  hasFilledCard(): boolean {
    // Ignora el último card (vacío)
    return this.itinerary
      .slice(0, this.itinerary.length - 1)
      .some(
        (item) =>
          item.title.trim() !== '' ||
          item.time.trim() !== '' ||
          item.description.trim() !== ''
      );
  }

  goToNextTab() {
    // Aquí colocas la ruta de tu siguiente tab
    this.router.navigate(['/tabs/tab2']);
  }
}
