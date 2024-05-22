import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Profesor } from '../../interfaces/profesor.interface';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent implements OnInit {
  usuarioLogueado: Profesor | null = null;

  constructor(private authService: AutenticacionService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usuario => {
      this.usuarioLogueado = usuario;
    });
  }
}
