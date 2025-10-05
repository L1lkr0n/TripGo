export interface ItineraryItem {
  title: string;                // Nombre del lugar
  time: string;                 // Hora de la visita
  description: string;          // Notas o detalles
  transport: string;            // Tipo de transporte

  // Campos extras para la IA / Google Maps
  lat: number | null;           // Latitud
  lng: number | null;           // Longitud
  routeOrder: number | null;    // Orden en la ruta final
  estimatedTravelTime: number | null; // Tiempo estimado de viaje
}
