import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Grupo } from '../../interfaces/profesor.interface';
import { AutenticacionService } from '../../services/autenticacion.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-crud-grupo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './crud-grupo.component.html',
  styleUrl: './crud-grupo.component.css'
})
export class CrudGrupoComponent implements OnInit {
  groupList: Grupo[]=[];
  apiS = inject(ApiService);


  constructor(private authService: AutenticacionService) { }
  ngOnInit(): void {
    this.authService.getUser().subscribe(usuario => {
      this.apiS.getGrupoByProfesor(usuario!.id).subscribe(
        {
          next: (response: Grupo[]) => {
            this.groupList = response;
          }
        }
      )
    });
  }
}
