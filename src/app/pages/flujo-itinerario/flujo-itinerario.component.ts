import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from 'src/app/shared/shared-module';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { ItineraryItem } from './itinerary-item.interface';
import { environment } from 'src/environments/environment';


// Registrar iconos
addIcons({
  'trash-outline': trashOutline,
});

@Component({
  standalone: true,
  selector: 'app-flujo-itinerario',
  templateUrl: './flujo-itinerario.component.html',
  styleUrls: ['./flujo-itinerario.component.scss'],
  imports: [...SHARED_IMPORTS],
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

  map: any; // Para guardar instancia de Google Map

  constructor(private modalCtrl: ModalController) {}

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


  // -------- STEP 2: GENERAR RUTA OPTIMIZADA SIMULADA ----------
 async generateOptimizedRoute() {
  await this.loadGoogleMapsScript();

  // Ruta de prueba real
  this.optimizedItinerary = [
    { title: 'Plaza de Armas', time: '10:00', description: '', transport: 'Caminando', lat: -33.4378, lng: -70.6505, routeOrder: 1, estimatedTravelTime: 0 },
    { title: 'Cerro Santa Lucía', time: '10:30', description: '', transport: 'Caminando', lat: -33.4370, lng: -70.6483, routeOrder: 2, estimatedTravelTime: 15 },
    { title: 'Museo Precolombino', time: '11:00', description: '', transport: 'Caminando', lat: -33.4375, lng: -70.6512, routeOrder: 3, estimatedTravelTime: 20 },
  ];

  console.log('Ruta optimizada de prueba:', this.optimizedItinerary);
  alert('Ruta de prueba generada. Revisa el mapa en Step 3.');

  this.loadMap(); // Mostrar la ruta
}


  // -------- STEP 3: MAPA ----------
 private loadMap() {
  if (!(window as any).google || !this.optimizedItinerary.length) return;

  const google = (window as any).google;
  const first = this.optimizedItinerary[0];
  const last = this.optimizedItinerary[this.optimizedItinerary.length - 1];

  // Crear mapa
  if (!this.map) {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: first.lat, lng: first.lng },
      zoom: 15,
    });
  } else {
    this.map.setCenter({ lat: first.lat, lng: first.lng });
  }

  // Dibujar marcadores
  this.optimizedItinerary.forEach((item) => {
    new google.maps.Marker({
      position: { lat: item.lat!, lng: item.lng! },
      map: this.map,
      title: item.title,
    });
  });

  // Dibujar línea entre los puntos
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({ map: this.map });

  const waypoints = this.optimizedItinerary.slice(1, -1).map(item => ({
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

  // -------- STEP 3: GUARDAR ITINERARIO ----------
  guardarItinerario() {
    const finalItinerary = this.optimizedItinerary.length
      ? this.optimizedItinerary
      : this.itinerary;

    console.log('Itinerario guardado:', finalItinerary);
    alert('Itinerario guardado!');
    // Aquí iría la lógica real de Firestore / backend
  }
}
