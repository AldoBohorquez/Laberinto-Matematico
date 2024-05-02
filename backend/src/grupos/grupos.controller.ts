import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposDto } from './dto/grupos.dto';

@Controller('grupos')
export class GruposController {

    constructor(private service: GruposService) {}
    

    @Get()
    obtenerGrupos() {
        return this.service.obtenerGrupos();
    }

    @Get(':id')
    obtenerGrupo(@Param('id') id: number) {
        return this.service.obtenerGrupo(id);
    }

    @Post()
    agregarGrupo(@Body() grupodto: GruposDto) {
        return this.service.agregarGrupo(grupodto);
    }

    @Put(':id')
    actualizarGrupo(@Param('id') id:number,@Body()grupodto: GruposDto) {
        return this.service.actualizarGrupo(id,grupodto);
    }

    @Delete(':id')
    eliminarGrupo(@Param('id') id: number) {
        return this.service.eliminarGrupo(id);
    }
}
