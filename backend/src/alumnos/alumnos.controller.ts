import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';

@Controller('alumnos')
export class AlumnosController {

    constructor(private service: AlumnosService) {}

    @Get()
    obtenerAlumnos() {
        return this.service.obtenerAlumnos();
    }

    @Get(':id')
    obtenerAlumno(@Param('id') id: number) {
        return this.service.obtenerAlumno(id);
    }

    @Post()
    agregarAlumno(@Body() bodyAlumnos) {
        return this.service.agregarAlumno(bodyAlumnos);
    }

    @Put(':id')
    actualizarAlumno(@Body() bodyAlumnos,@Param('id') id: number) {
        return this.service.actualizarAlumno(id, bodyAlumnos);
    }
}
