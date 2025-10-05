import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SHARED_IMPORTS } from '../../shared/shared-module';
import { ItineraryItem } from '../flujo-itinerario/itinerary-item.interface';

@Component({
  standalone: true,
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
  imports: [...SHARED_IMPORTS],
})
export class DetailModalComponent {
  @Input() item!: ItineraryItem;

  constructor(private modalCtrl: ModalController) {}

  save() {
    // Garantizamos que cada destino tenga la estructura básica
    const defaultItem: Partial<ItineraryItem> = {
      lat: null,
      lng: null,
      routeOrder: null,
      estimatedTravelTime: null,
    };

    this.modalCtrl.dismiss({ ...defaultItem, ...this.item });

    this.modalCtrl.dismiss({ ...defaultItem, ...this.item });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
