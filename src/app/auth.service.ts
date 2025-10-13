import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  user$ = this.currentUser.asObservable();

  constructor(private auth: Auth ,private router: Router) {
    onAuthStateChanged(this.auth, user => this.currentUser.next(user));
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => {
    this.router.navigateByUrl('/login');
    });
  }

  getUser() {
    return this.currentUser.value;
  }
  isAuthenticated() {
    return !!this.currentUser.value;
  }
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}