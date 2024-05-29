import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Alumno, Grupo } from '../../interfaces/profesor.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizacion-grupo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './visualizacion-grupo.component.html',
  styleUrl: './visualizacion-grupo.component.css'
})
export class VisualizacionGrupoComponent {
  apiS = inject(ApiService);
  miGrupo: Grupo | null = null;
  listaAlumnos:Alumno[] = [];
  _activeRoute = inject(ActivatedRoute);
  _router = inject(Router)

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


  goToRegister(id: number){
    this._router.navigateByUrl(`registrarEstudiante/${id}`);
  }

  goToStudents(id: number){
    this._router.navigateByUrl(`crudEstudiante/${id}`);
  }
}
