import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AutenticacionService);
  const router = inject(Router);

  if (authService.isLoggedInSync()) {
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
