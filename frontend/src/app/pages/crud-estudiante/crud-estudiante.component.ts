import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Alumno, Grupo } from '../../interfaces/profesor.interface';
import { AlertService } from '../../services/alert.service';

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
  _router = inject(Router);
  sweet = inject(AlertService);

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

  deleteAlumno(id: number) {
    this.apiS.deleteAlumno(id).subscribe(() => {
      this.listaAlumnos = this.listaAlumnos.filter(alum => alum.id !== id);
      this.sweet.alert('Estudiante eliminado','error');
    }, error => {
      console.error('Error al eliminar el Estudiante:', error);
    });
  }
}
