import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarProfesorComponent } from './pages/registrar-profesor/registrar-profesor.component';
import { LoginProfesorComponent } from './pages/login-profesor/login-profesor.component';
import { LevelComponent } from './pages/level/level.component';
import { SectionComponent } from './pages/section/section.component';
import { RegistrarGrupoComponent } from './pages/registrar-grupo/registrar-grupo.component';
import { RegistrarEstudianteComponent } from './pages/registrar-estudiante/registrar-estudiante.component';
import { PuntuacionComponent } from './pages/puntuacion/puntuacion.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';

export const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'registrarProfesor',
    component: RegistrarProfesorComponent
  },
  {
    path:'loginProfesor',
    component: LoginProfesorComponent
  },
  {
    path:'level',
    component: LevelComponent
  },
  {
    path:'section',
    component: SectionComponent
  },
  {
    path:'registrarGrupo',
    component: RegistrarGrupoComponent
  },
  {
    path:'registrarEstudiante',
    component: RegistrarEstudianteComponent
  },
  {
    path:'puntuacion',
    component: PuntuacionComponent
  },
  {
    path:'bienvenida',
    component: BienvenidaComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
