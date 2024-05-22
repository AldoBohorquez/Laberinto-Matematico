import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarProfesorComponent } from './pages/registrar-profesor/registrar-profesor.component';
import { LoginProfesorComponent } from './pages/login-profesor/login-profesor.component';
import { LevelComponent } from './pages/level/level.component';
import { SectionComponent } from './pages/section/section.component';
import { RegistrarGrupoComponent } from './pages/registrar-grupo/registrar-grupo.component';
import { RegistrarEstudianteComponent } from './pages/registrar-estudiante/registrar-estudiante.component';
import { PuntuacionComponent } from './pages/puntuacion/puntuacion.component';
import { VisualizacionGrupoComponent } from './pages/visualizacion-grupo/visualizacion-grupo.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { CrudEstudianteComponent } from './pages/crud-estudiante/crud-estudiante.component';
import { PersonajesComponent } from './pages/personajes/personajes.component';
import { CrudGrupoComponent } from './pages/crud-grupo/crud-grupo.component';
import { authGuard } from './auth.guard';

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
    component: RegistrarGrupoComponent,
    canActivate: [authGuard]
  },
  {
    path:'registrarEstudiante',
    component: RegistrarEstudianteComponent,
    canActivate: [authGuard]
  },
  {
    path:'puntuacion',
    component: PuntuacionComponent
  },
  {
    path:'bienvenida',
    component: BienvenidaComponent,
    canActivate: [authGuard]
  },
  {
    path:'visualizacion',
    component: VisualizacionGrupoComponent,
    canActivate: [authGuard]
  },
  {
    path:'crudEstudiante',
    component: CrudEstudianteComponent,
    canActivate: [authGuard]
  },
  {
    path:'personajes',
    component: PersonajesComponent
  },
  {
    path:'crudGrupo',
    component: CrudGrupoComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
