import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from 'src/app/shared/shared-module';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { ItineraryItem } from './itinerary-item.interface';

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

  // -------- STEP 2: GENERAR RUTA OPTIMIZADA SIMULADA ----------
  generateOptimizedRoute() {
    this.optimizedItinerary = this.itinerary
      .filter((item) => item.title.trim() !== '')
      .map((item, index) => ({
        ...item,
        lat: -33.4489 + 0.001 * index,
        lng: -70.6693 + 0.001 * index,
        routeOrder: index + 1,
        estimatedTravelTime: 15 + 5 * index,
      }));

    console.log('Itinerario optimizado simulado:', this.optimizedItinerary);
    alert('Ruta optimizada simulada generada. Revisa la consola.');

    // --- Cargar o actualizar mapa automáticamente ---
    this.loadMap();
  }

  // -------- STEP 3: MAPA ----------
  private loadMap() {
    if (!(window as any).google || !this.optimizedItinerary.length) return;

    const first = this.optimizedItinerary[0];

    // Si ya existe un mapa, solo cambiamos el centro y borramos markers antiguos
    if (!this.map) {
      this.map = new (window as any).google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: first.lat, lng: first.lng },
          zoom: 12,
        }
      );
    } else {
      this.map.setCenter({ lat: first.lat, lng: first.lng });
      // Opcional: borrar markers previos si los guardas en un array
    }

    // Crear marcadores nuevos
    this.optimizedItinerary.forEach((item) => {
      new (window as any).google.maps.Marker({
        position: { lat: item.lat!, lng: item.lng! },
        map: this.map,
        title: item.title,
      });
    });
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
