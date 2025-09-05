import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedModule } from '../shared/shared-module';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
  imports: [SharedModule]
})
export class DetailModalComponent {
 @Input() item: any;

  constructor(private modalCtrl: ModalController) {}

  save() {
    this.modalCtrl.dismiss(this.item);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
