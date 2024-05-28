import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Grupo } from '../../interfaces/profesor.interface';

@Component({
  selector: 'app-visualizacion-grupo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './visualizacion-grupo.component.html',
  styleUrl: './visualizacion-grupo.component.css'
})
export class VisualizacionGrupoComponent {
  apiS = inject(ApiService);
  miGrupo:any = {};
  _activeRoute = inject(ActivatedRoute);

  constructor(){
    this._activeRoute.params.subscribe(params => {
      // console.log(params['id']);
      this.getGrupo(params['id']);
    });
  }

  getGrupo(id: number){
    this.apiS.getGrupo(id).subscribe((resp: Grupo) => {
      console.log(resp);
      this.miGrupo = resp;
    })
  };
}
