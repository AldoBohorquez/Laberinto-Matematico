import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AutenticacionService);

  isLoginProfesorPage: boolean = false;
  isHomePage: boolean = false;
  isJuegoPage: boolean = false;
  isProfesorPage: boolean = false;

  //mostrar o no, botones
  showBtnIngresar: boolean = true;
  showBtnsProfesor: boolean = false;

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //verifica que ruta esta activa
        this.isHomePage = event.url === '/home';
        this.isLoginProfesorPage =
          event.url === '/loginProfesor' || event.url === '/registrarProfesor';
        this.isJuegoPage =
          event.url === '/section' ||
          event.url === '/level' ||
          event.url === '/puntuacion' ||
          event.url === '/personajes';
        this.isProfesorPage =
          event.url === '/registrarGrupo' ||
          event.url === '/registrarEstudiante' ||
          event.url === '/bienvenida' ||
          event.url === '/crudGrupo' ||
          event.url === '/registrarEstudiante' ||
          event.url === '/crudEstudiante' ||
          event.url.startsWith('/visualizacion/');;

          this.updateButtonVisibility();
      }
    });

    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.showBtnIngresar = !isLoggedIn && !this.isJuegoPage && !this.isProfesorPage;
      this.showBtnsProfesor = isLoggedIn && !this.isHomePage && !this.isLoginProfesorPage && !this.isJuegoPage;
    });
  }

  private updateButtonVisibility() {
    const isLoggedIn = this.authService.isLoggedInSync();
    this.showBtnIngresar = !isLoggedIn && !this.isJuegoPage && !this.isProfesorPage;
    this.showBtnsProfesor = isLoggedIn && !this.isHomePage && !this.isLoginProfesorPage && !this.isJuegoPage;
  }
}
