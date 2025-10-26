import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authenticateGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  // Si ya está logueado, redirigir al Dashboard
  if (isLoggedIn) {
    router.navigate(['/DashBoard']);
    return false;
  }

  // Si no está logueado, permitir acceso al login
  return true;
};
