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
import { GameComponent } from './pages/game/game.component';

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
    component: LevelComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'alumno' }
  },
  {
    path:'section',
    component: SectionComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'alumno' }
  },
  {
    path:'registrarGrupo',
    component: RegistrarGrupoComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'profesor' }
  },
  {
    path:'registrarEstudiante/:id',
    component: RegistrarEstudianteComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'profesor' }
  },
  {
    path:'puntuacion',
    component: PuntuacionComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'alumno' }
  },
  {
    path:'bienvenida',
    component: BienvenidaComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'profesor' }
  },
  {
    path:'visualizacion/:id',
    component: VisualizacionGrupoComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'profesor' }
  },
  {
    path:'crudEstudiante/:id',
    component: CrudEstudianteComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'profesor' }
  },
  {
    path:'personajes',
    component: PersonajesComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'alumno' }
  },
  {
    path:'crudGrupo',
    component: CrudGrupoComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'profesor' }
  },
  {
    path:'game',
    component: GameComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'alumno' }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
