import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SalasService } from './salas.service';
import { salasDto } from './dto/salas.dto';

@Controller('salas')
export class SalasController {

    constructor(private service: SalasService) {}

    @Get()
    obtenerSalas() {
        return this.service.obtenerSalas();
    }

    @Get(':id')
    obtenerSala(@Param('id') id: number) {
        return this.service.obtenerSala(id);
    }

    @Post()
    agregarSala(@Body() bodySalas:salasDto) {
        return this.service.agregarSala(bodySalas);
    }

    @Put(':id')
    actualizarSala(@Body() bodySalas,@Param('id') id: number) {
        return this.service.actualizarSala(id, bodySalas);
    }

    @Delete(':id')
    eliminarSala(@Param('id') id: number) {
        return this.service.eliminarSala(id);
    }

}
