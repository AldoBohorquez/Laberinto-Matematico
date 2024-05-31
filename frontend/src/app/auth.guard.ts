import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';
import { AlumnoAutenticacionService } from './services/alumnos-autenticacion.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServiceProfesor = inject(AutenticacionService);
  const authServiceAlumno = inject(AlumnoAutenticacionService);

  const expectedRole = route.data['expectedRole'];

  let isLoggedIn: boolean;
  if (expectedRole === 'profesor') {
    isLoggedIn = authServiceProfesor.isLoggedInSync();
  } else if (expectedRole === 'alumno') {
    isLoggedIn = authServiceAlumno.isLoggedInSync();
  } else {
    router.navigate(['/home']);
    return false;
  }

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
