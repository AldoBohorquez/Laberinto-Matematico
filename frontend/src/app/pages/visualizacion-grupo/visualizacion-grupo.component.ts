import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Alumno, Grupo } from '../../interfaces/profesor.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualizacion-grupo',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './visualizacion-grupo.component.html',
  styleUrl: './visualizacion-grupo.component.css'
})
export class VisualizacionGrupoComponent {
  apiS = inject(ApiService);
  miGrupo: Grupo | null = null;
  listaAlumnos:Alumno[] = [];
  _activeRoute = inject(ActivatedRoute);
  _router = inject(Router);

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
        console.log(this.listaAlumnos);

      }
    })
  };


  goToRegister(id: number){
    this._router.navigateByUrl(`registrarEstudiante/${id}`);
  }

  goToStudents(id: number){
    this._router.navigateByUrl(`crudEstudiante/${id}`);
  }


  onChangeSwitch(event: any) {
    const newValue = event.target.checked;
    console.log('Nuevo valor del interruptor:', newValue);
  }
}
