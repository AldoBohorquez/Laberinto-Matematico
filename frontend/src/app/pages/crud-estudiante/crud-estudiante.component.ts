import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Alumno, Grupo } from '../../interfaces/profesor.interface';

@Component({
  selector: 'app-crud-estudiante',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './crud-estudiante.component.html',
  styleUrl: './crud-estudiante.component.css'
})
export class CrudEstudianteComponent {
  apiS = inject(ApiService);
  miGrupo: Grupo | null = null;
  listaAlumnos:Alumno[] = [];
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
      if (this.miGrupo && this.miGrupo.alumnos) {
        this.listaAlumnos = this.miGrupo.alumnos;
      }
    })
  };
}
