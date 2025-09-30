import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, trashOutline, pencilOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { DetailModalComponent } from 'src/app/detail-modal/detail-modal.component';
// Registrar el icono del FAB
addIcons({
  'arrow-forward-outline': arrowForwardOutline,
  'trash-outline': trashOutline,
  'pencil-outline': pencilOutline
});
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [SharedModule],
})
export class Tab2Page {
  itinerary = [{ title: '', time: '', description: '', transport: '' }];
  constructor(private modalCtrl: ModalController) {}

  async openDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent,
      componentProps: { item: { ...this.itinerary[index] } },
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.itinerary[index] = res.data;

        // Si el usuario llenó algo y es el último card → crea uno nuevo vacío
        const lastIndex = this.itinerary.length - 1;
        const lastCard = this.itinerary[lastIndex];
        if (
          lastCard.title.trim() !== '' ||
          lastCard.time.trim() !== '' ||
          lastCard.description.trim() !== ''
        ) {
          // Solo agrega uno nuevo si el último card está lleno
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
}
