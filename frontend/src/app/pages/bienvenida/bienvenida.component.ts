import { Component, OnInit, inject } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Grupo, Profesor } from '../../interfaces/profesor.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent implements OnInit {
  usuarioLogueado: Profesor | null = null;

  apiS = inject(ApiService);

  groupList = Array<Grupo>();

  constructor(private authService: AutenticacionService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      console.log('Usuario logueado', this.usuarioLogueado);
      this.apiS.getGrupoByProfesor(usuario!.id).subscribe(
        {
          next: (response: Grupo[]) => {
            this.groupList = response;
            console.log('Grupos del profesor', this.groupList);
          }
        }
      )
    });    
  }
}
