import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  _activeRoute = inject(ActivatedRoute);
  personaje: string = '';

  constructor() {
    this._activeRoute.params.subscribe(params => {
      this.personaje = params['personaje'];
    });
  }

}
