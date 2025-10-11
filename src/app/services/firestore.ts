import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addItinerary(itinerary: any) {
    const ref = collection(this.firestore, 'itinerarios');
    return addDoc(ref, itinerary);
  }
}
