import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Grupo } from '../../interfaces/profesor.interface';
import { AutenticacionService } from '../../services/autenticacion.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

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
}
