import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosDto } from './dto/alumnos.dto';

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
    agregarAlumno(@Body() body:AlumnosDto) {
        return this.service.agregarAlumno(body);
    }

    @Put(':id')
    actualizarAlumno(@Param('id') id: number, @Body() body:AlumnosDto) {
        return this.service.actualizarAlumno(id, body);
    }

    @Delete(':id')
    eliminarAlumno(@Param('id') id: number) {
        return this.service.eliminarAlumno(id);
    }
}
