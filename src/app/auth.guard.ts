import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();

  if (user) {
    // Si hay usuario autenticado, puede pasar
    return true;
  } else {
    // Si no hay usuario, lo redirigimos al login
    router.navigateByUrl('/login');
    return false;
  }
};