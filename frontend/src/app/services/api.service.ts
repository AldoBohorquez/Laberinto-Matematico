import { Injectable, inject } from '@angular/core';

import { Profesor } from '../interfaces/profesor.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http=inject(HttpClient);

  constructor() { }

  nuevoProfesor(profe: Profesor){
    return this._http.post<Profesor>('http://localhost:3000/profesores', profe);
  }

}
