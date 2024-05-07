import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLoginProfesorPage: boolean = false;
  isHomePage: boolean = false;
  isJuegoPage: boolean = false;
  isProfesorPage: boolean = false;

  //mostrar o no, botones
  showBtnIngresar: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        //verifica que ruta esta activa
        this.isHomePage = event.url === '/home';
        this.isLoginProfesorPage = (event.url === '/loginProfesor') || (event.url === '/registrarProfesor') ;
        this.isJuegoPage = (event.url === '/section')|| (event.url === '/level');


        //muestra botones
        this.showBtnIngresar = !this.isJuegoPage && !this.isProfesorPage;
      }
    })
  }

  isWhite(): boolean {
    return this.router.url === '/home';
  }
}
