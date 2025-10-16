import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { IonicModule, ModalController } from '@ionic/angular';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { ItineraryItem } from './itinerary-item.interface';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore';

// Registrar iconos
addIcons({
  'trash-outline': trashOutline,
});

@Component({
  standalone: true,
  selector: 'app-flujo-itinerario',
  templateUrl: './flujo-itinerario.component.html',
  styleUrls: ['./flujo-itinerario.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatStepperModule,
    MatButtonModule,
  ],
})
export class FlujoItinerarioComponent implements OnInit {
  itinerary: ItineraryItem[] = [
    {
      title: '',
      time: '',
      description: '',
      transport: '',
      lat: null,
      lng: null,
      routeOrder: null,
      estimatedTravelTime: null,
    },
  ];

  optimizedItinerary: ItineraryItem[] = [];
  isGenerating = false; // Flag spinner/bloqueo botón
  map: any;

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.ensureEmptyCard();
  }

  // Asegura siempre un card vacío al final
  private ensureEmptyCard() {
    const last = this.itinerary[this.itinerary.length - 1];
    if (last && (last.title || last.time || last.description)) {
      this.itinerary.push({
        title: '',
        time: '',
        description: '',
        transport: '',
        lat: null,
        lng: null,
        routeOrder: null,
        estimatedTravelTime: null,
      });
    }
  }

  async openDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent,
      componentProps: { item: { ...this.itinerary[index] } },
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.itinerary[index] = res.data;
        this.ensureEmptyCard();
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
    return this.itinerary.some(
      (item) => item.title.trim() || item.time.trim() || item.description.trim()
    );
  }

  private loadGoogleMapsScript(): Promise<void> {
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

  private async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const google = (window as any).google;
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === "OK" && results[0]) {
        resolve({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      } else {
        console.error("Error geocoding:", address, status);
        resolve({ lat: 0, lng: 0 }); // fallback
      }
    });
  });
}


  // -------------------- STEP 2: Gemini --------------------
// -------------------- STEP 2: Gemini --------------------
async generateOptimizedRoute() {
  if (!this.hasFilledCard()) {
    alert('Agrega al menos un lugar antes de optimizar la ruta.');
    return;
  }

  this.isGenerating = true;

  try {
    // Preparamos el itinerario indicando transporte solo si el usuario no lo puso
    const itineraryForBackend = this.itinerary.map(item => ({
      ...item,
      transport: item.transport || null, // null si el usuario no seleccionó
    }));

    const res = await fetch('http://localhost:3000/optimize-itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itinerary: itineraryForBackend }),
    });

    const data = await res.json();

    // Fusionamos optimización con lat/lng y transporte ya existente
    this.optimizedItinerary = data.map((item: any, i: number) => ({
      ...item,
      lat: this.itinerary[i].lat ?? 0,
      lng: this.itinerary[i].lng ?? 0,
      transport: this.itinerary[i].transport || item.transport, // Respeta transporte usuario
    }));

    console.log("Step 2 - Optimized Itinerary:", this.optimizedItinerary);
    this.loadMap(); // Renderiza Step 3
  } catch (err) {
    console.error('Error generando ruta optimizada:', err);
    alert('Error generando ruta optimizada. Revisa la consola.');
  } finally {
    this.isGenerating = false;
  }
}




  // -------------------- STEP 3: Google Maps --------------------
  private loadMap() {
    if (!(window as any).google || !this.optimizedItinerary.length) return;

    const google = (window as any).google;
    const first = this.optimizedItinerary[0];
    const last = this.optimizedItinerary[this.optimizedItinerary.length - 1];

    if (!this.map) {
      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: first.lat, lng: first.lng },
          zoom: 15,
        }
      );
    } else {
      this.map.setCenter({ lat: first.lat, lng: first.lng });
    }

    // Marcadores
    this.optimizedItinerary.forEach((item) => {
      new google.maps.Marker({
        position: { lat: item.lat!, lng: item.lng! },
        map: this.map,
        title: item.title,
      });
    });

    // Ruta
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
    });

    const waypoints = this.optimizedItinerary.slice(1, -1).map((item) => ({
      location: { lat: item.lat, lng: item.lng },
      stopover: true,
    }));

    directionsService.route(
      {
        origin: { lat: first.lat, lng: first.lng },
        destination: { lat: last.lat, lng: last.lng },
        waypoints,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response: any, status: string) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          console.error('Error en la ruta:', status);
        }
      }
    );
  }

  // -------------------- STEP 3: Guardar en Firestore --------------------
  guardarItinerario() {
    const finalItinerary = this.optimizedItinerary.length
      ? this.optimizedItinerary
      : this.itinerary;

    const sanitizedItems = finalItinerary.map((item) => ({
      ...item,
      lat: item.lat ?? 0,
      lng: item.lng ?? 0,
    }));

    this.firestoreService
      .addItinerary({ createdAt: new Date(), items: sanitizedItems })
      .then(() => alert('Itinerario guardado en Firestore!'))
      .catch((err) => {
        console.error('Error guardando itinerario:', err);
        alert('Error guardando itinerario. Revisa la consola.');
      });
  }
}
