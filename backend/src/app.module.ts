import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import { GruposModule } from './grupos/grupos.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { PuntuacionesModule } from './puntuaciones/puntuaciones.module';
import { NivelesModule } from './niveles/niveles.module';
import { SeccionesModule } from './secciones/secciones.module';
import { SalasModule } from './salas/salas.module';
import { AlumnosController } from './alumnos/alumnos.controller';
import { AlumnosService } from './alumnos/alumnos.service';
import { AlumnosModule } from './alumnos/alumnos.module';

@Module({
  imports: [EjerciciosModule, GruposModule, ProfesoresModule, PuntuacionesModule, NivelesModule, SeccionesModule, SalasModule, AlumnosModule],
  controllers: [AppController, AlumnosController],
  providers: [AppService, AlumnosService],
})
export class AppModule {}
