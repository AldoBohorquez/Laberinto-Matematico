import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import { GruposModule } from './grupos/grupos.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { PuntuacionesModule } from './puntuaciones/puntuaciones.module';
import { NivelesModule } from './niveles/niveles.module';
import { SalasModule } from './salas/salas.module';
import { AlumnosController } from './alumnos/alumnos.controller';
import { AlumnosService } from './alumnos/alumnos.service';
import { AlumnosModule } from './alumnos/alumnos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnosEntity } from './alumnos/entity/alumnos.entity';
import { EjerciciosEntity } from './ejercicios/entity/ejercicios.entity';
import { GruposEntity } from './grupos/entity/grupos.entity';
import { NivelesEntity } from './niveles/entity/niveles.entity';
import { ProfesoresEntity } from './profesores/entity/profesores.entity';
import { PuntuacionesEntity } from './puntuaciones/entity/puntuaciones.entity';
import { SalasEntity } from './salas/entity/salas.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "qwe",
    database: "LaberintoMatematico",
    synchronize: true,
    logging: true,
    entities: [AlumnosEntity, EjerciciosEntity, GruposEntity, NivelesEntity, ProfesoresEntity, PuntuacionesEntity, SalasEntity],
    subscribers: [],
    migrations: [],
  })
    ,EjerciciosModule, GruposModule, ProfesoresModule, PuntuacionesModule, NivelesModule, SalasModule, AlumnosModule],
  controllers: [AppController, AlumnosController],
  providers: [AppService, AlumnosService],
})
export class AppModule {}
