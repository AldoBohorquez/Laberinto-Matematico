import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puntuacion',
  standalone: true,
  imports: [],
  templateUrl: './puntuacion.component.html',
  styleUrl: './puntuacion.component.css'
})
export class PuntuacionComponent {
  _activeRoute = inject(ActivatedRoute);
  personaje: string = '';
  score: number = 0;


  constructor() {
    this._activeRoute.params.subscribe((params) => {
      this.personaje = params['personaje'];
      this.score = parseInt(params['score']);
    });
  }
}
