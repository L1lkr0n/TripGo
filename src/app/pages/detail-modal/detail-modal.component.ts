import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ItineraryItem } from '../flujo-itinerario/itinerary-item.interface';
import { environment } from 'src/environments/environment';
import { IonInput } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class DetailModalComponent implements AfterViewInit {
  @Input() item!: ItineraryItem;
  @ViewChild('destinationInput', { static: false }) destinationInput!: IonInput;

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  private async loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }

  private async initAutocomplete() {
    await this.loadGoogleMapsScript();
    const google = (window as any).google;

    if (!this.destinationInput) return;

    const nativeInput = await this.destinationInput.getInputElement();

    // Limitar a la Región Metropolitana (aprox.)
    const santiagoBounds = new google.maps.LatLngBounds(
      { lat: -33.75, lng: -70.85 }, // suroeste
      { lat: -33.3, lng: -70.5 } // noreste
    );

    const autocomplete = new google.maps.places.Autocomplete(nativeInput, {
      types: ['geocode'],
      componentRestrictions: { country: 'cl' }, // Chile
      bounds: santiagoBounds,
      strictBounds: true, // obliga a buscar dentro del bounds
    });

    autocomplete.addListener('place_changed', async () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      this.item.lat = place.geometry.location.lat();
      this.item.lng = place.geometry.location.lng();
      this.item.title = place.name || this.item.title;
    });
  }

  save() {
    const defaultItem: Partial<ItineraryItem> = {
      lat: null,
      lng: null,
      routeOrder: null,
      estimatedTravelTime: null,
    };
    this.modalCtrl.dismiss({ ...defaultItem, ...this.item });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
