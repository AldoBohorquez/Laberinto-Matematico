import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../interfaces/profesor.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumnoAutenticacionService {
  private loggedInAlumno = new BehaviorSubject<boolean>(this.checkToken());
  private usuarioLogueadoSubject = new BehaviorSubject<Alumno | null>(this.getUserFromStorage());

  constructor(private router: Router) { }

  private checkToken(): boolean {
    return localStorage.getItem('authTokenAlumno') === 'true';
  }

  private getUserFromStorage(): Alumno | null {
    const usuarioString = localStorage.getItem('usuarioLogueadoAlumno');
    return usuarioString ? JSON.parse(usuarioString) : null;
  }

  login(datosUsuario: Alumno) {
    this.usuarioLogueadoSubject.next(datosUsuario);
    localStorage.setItem('authTokenAlumno', 'true');
    localStorage.setItem('usuarioLogueadoAlumno', JSON.stringify(datosUsuario));
    this.loggedInAlumno.next(true);
  }

  logout() {
    localStorage.removeItem('authTokenAlumno');
    localStorage.removeItem('usuarioLogueadoAlumno');
    this.loggedInAlumno.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInAlumno.asObservable();
  }

  isLoggedInSync(): boolean {
    return this.loggedInAlumno.value;
  }

  getUser(): Observable<Alumno | null> {
    return this.usuarioLogueadoSubject.asObservable();
  }

  getUserSync(): Alumno | null {
    return this.usuarioLogueadoSubject.value;
  }
}
