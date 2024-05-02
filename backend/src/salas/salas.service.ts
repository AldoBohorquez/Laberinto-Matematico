import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SalasEntity } from './entity/salas.entity';
import { GruposEntity } from 'src/grupos/entity/grupos.entity';
import { salasDto } from './dto/salas.dto';

@Injectable()
export class SalasService {

    constructor(private dataSource:DataSource)
    {}

    async obtenerSalas()
    {
        try {
            return await this.dataSource.getRepository(SalasEntity).find({relations:['grupos']});
        } catch (error) {
            throw new HttpException("Error al obtener las salas",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerSala(id:number)
    {
        try {
            return await this.dataSource.getRepository(SalasEntity).findOne({where:{id:id},relations:['grupos']});
        } catch (error) {
            throw new HttpException("Error al obtener la sala",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarSala(salaBase:salasDto)
    {
        try {
            const nuevaSala = await this.dataSource.getRepository(SalasEntity).create(salaBase);

            const gruposFind = await this.dataSource.getRepository(GruposEntity).findOne({where:{id_grupo:salaBase.gruposId}});

            nuevaSala.grupos = gruposFind;

            gruposFind.salas = nuevaSala;

            await this.dataSource.getRepository(GruposEntity).save(gruposFind);

            return await this.dataSource.getRepository(SalasEntity).save(nuevaSala);
        } catch (error) {
            throw new HttpException("Error al agregar la sala",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarSala(id:number)
    {
        try {
            return await this.dataSource.getRepository(SalasEntity).delete(id);
        } catch (error) {
            throw new HttpException("Error al eliminar la sala",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarSala(id:number,salaBase:salasDto)
    {
        try {
            const salaFind = await this.dataSource.getRepository(SalasEntity).findOne({where:{id:id}});
            const gruposFind = await this.dataSource.getRepository(GruposEntity).findOne({where:{id_grupo:salaBase.gruposId}});

            salaFind.grupos = gruposFind;

            gruposFind.salas = salaFind;

            await this.dataSource.getRepository(GruposEntity).save(gruposFind);

            return await this.dataSource.getRepository(SalasEntity).update(salaFind,salaBase);
        } catch (error) {
            throw new HttpException("Error al actualizar la sala",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
