import { Injectable, inject } from '@angular/core';

import { Grupo, Profesor } from '../interfaces/profesor.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});


  private _http=inject(HttpClient);

  constructor() { }

  nuevoProfesor(profe: Profesor){
    return this._http.post<Profesor>('http://localhost:3000/profesores', profe,{ headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  loginProfesor(profe: Profesor) {
    return this._http.post<Profesor>('http://localhost:3000/profesores/login', profe,{ headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  nuevoGrupo(group: Grupo){
    return this._http.post<Grupo>('http://localhost:3000/grupos', group,{ headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  getGrupoByProfesor(profeId: number){
    return this._http.get<Grupo[]>(`http://localhost:3000/grupos/profesor/${profeId}`,{ headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  getGrupo(id_grupo:number){
    return this._http.get<Grupo>(`http://localhost:3000/grupos/${id_grupo}`,{ headers: { 'Access-Control-Allow-Origin': '*' } });
  }

}
