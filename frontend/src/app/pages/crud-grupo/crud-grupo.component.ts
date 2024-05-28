import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Grupo } from '../../interfaces/profesor.interface';
import { AutenticacionService } from '../../services/autenticacion.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-crud-grupo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './crud-grupo.component.html',
  styleUrls: ['./crud-grupo.component.css'],
})
export class CrudGrupoComponent implements OnInit {
  groupList: Grupo[] = [];
  apiS = inject(ApiService);
  _router = inject(Router);
  sweet = inject(AlertService);


  constructor(private authService: AutenticacionService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((usuario) => {
      this.apiS.getGrupoByProfesor(usuario!.id).subscribe({
        next: (response: Grupo[]) => {
          this.groupList = response;
        },
      });
    });
  }

  goToDetail(id: number){
    this._router.navigateByUrl(`visualizacion/${id}`);
  }

  deleteGroup(id: number) {
    this.apiS.deleteGrupo(id).subscribe(() => {
      this.groupList = this.groupList.filter(group => group.id_grupo !== id);
      this.sweet.alert('Grupo eliminado','error');
    }, error => {
      console.error('Error al eliminar el grupo:', error);
    });
  }

}
