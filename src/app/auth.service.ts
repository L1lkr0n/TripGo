import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, setDoc, doc } from '@angular/fire/firestore';
import { hashPassword } from 'src/app/utils'; // importa la función
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firestore: Firestore) {
  }
  async login(email: string, password: string): Promise<boolean> {
    const hashedPassword = await hashPassword(password);

    const usuariosRef = collection(this.firestore, 'usuarios');
    const q = query(usuariosRef, where('email', '==', email), where('password', '==', hashedPassword));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  async register(email: string, password: string): Promise<void> {
    const hashedPassword = await hashPassword(password);

    const usuariosRef = collection(this.firestore, 'usuarios');
    await setDoc(doc(usuariosRef), { email, password: hashedPassword });
  }
}