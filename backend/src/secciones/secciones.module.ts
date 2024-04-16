import { Module } from '@nestjs/common';
import { SeccionesService } from './secciones.service';
import { SeccionesController } from './secciones.controller';

@Module({
  providers: [SeccionesService],
  controllers: [SeccionesController]
})
export class SeccionesModule {}
