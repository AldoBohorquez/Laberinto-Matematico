import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EjerciciosService } from './ejercicios.service';

@Controller('ejercicios')
export class EjerciciosController {

    constructor(private service: EjerciciosService) {}

    @Get()
    obtenerEjercicios() {
        return this.service.obtenerEjercicios();
    }

    @Get(':id')
    obtenerEjercicio(@Param('id') id: number) {
        return this.service.obtenerEjercicio(id);
    }

    @Post()
    agregarEjercicio(@Body() bodyEjercicios) {
        return this.service.agregarEjercicio(bodyEjercicios);
    }

    @Put(':id')
    actualizarEjercicio(@Body() bodyEjercicios,@Param('id') id: number) {
        return this.service.actualizarEjercicio(id, bodyEjercicios);
    }

    @Delete(':id')
    eliminarEjercicio(@Param('id') id: number) {
        return this.service.eliminarEjercicio(id);
    }

}
