import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// 🔒 Protege rutas que requieren autenticación
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

// 🚪 Evita acceder al login si ya estás autenticado
export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    router.navigate(['/Dashboard']);
    return false;
  }
  return true;
};
