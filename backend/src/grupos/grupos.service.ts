import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GruposEntity } from './entity/grupos.entity';
import { GruposDto } from './dto/grupos.dto';
import { ProfesoresEntity } from 'src/profesores/entity/profesores.entity';
import { SalasEntity } from 'src/salas/entity/salas.entity';
import { AlumnosEntity } from 'src/alumnos/entity/alumnos.entity';

@Injectable()
export class GruposService {

    constructor(private dataSorce:DataSource)
    {}

    async obtenerGrupos()
    {
        try {
            const grupos = await this.dataSorce.getRepository(GruposEntity).find({relations:['profesor','salas','alumnos']})
            if(!grupos)
            {
                return new HttpException('No se encontraron grupos',HttpStatus.NOT_FOUND)
            }
            return grupos
        } catch (error) {
            throw new HttpException('Error al obtener los grupos',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerGrupo(id:number)
    {
        try {
            const grupoFind = await this.dataSorce.getRepository(GruposEntity).findOne({where:{id_grupo:id},relations:['profesor','salas','alumnos']})
            if(!grupoFind)
            {
                return new HttpException('No se encontro el grupo',HttpStatus.NOT_FOUND)
            }
            return grupoFind
        } catch (error) {
            throw new HttpException('Error al obtener el grupo',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarGrupo(grupoBase:GruposDto)
    {
        try {
            const nuevoGrupo = await this.dataSorce.getRepository(GruposEntity).create(grupoBase)

            const profesorFind = await this.dataSorce.getRepository(ProfesoresEntity).findOne({where:{id:grupoBase.profesorId},relations:['grupos']})
            if(!profesorFind)
            {
                return new HttpException('No se encontro el profesor',HttpStatus.NOT_FOUND)
            }

            const salaFind = await this.dataSorce.getRepository(SalasEntity).findOne({where:{id:grupoBase.salasId}})
            if(!salaFind)
            {
                return new HttpException('No se encontro la sala',HttpStatus.NOT_FOUND)
            }

            nuevoGrupo.salas = salaFind

            const saveGrupo = await this.dataSorce.getRepository(GruposEntity).save(nuevoGrupo)

            profesorFind.grupos.push(saveGrupo)

            await this.dataSorce.getRepository(ProfesoresEntity).save(profesorFind)

            salaFind.gruposId = saveGrupo.id_grupo

            await this.dataSorce.getRepository(SalasEntity).save(salaFind)

            return saveGrupo

        } catch (error) {
            throw new HttpException('Error al agregar el grupo',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarGrupo(id:number)
    {
        try {
            const grupoFind = await this.dataSorce.getRepository(GruposEntity).findOne({where:{id_grupo:id}})
            if(!grupoFind)
            {
                return new HttpException('No se encontro el grupo',HttpStatus.NOT_FOUND)
            }

            return await this.dataSorce.getRepository(GruposEntity).remove(grupoFind)
        } catch (error) {
            throw new HttpException('Error al eliminar el grupo',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarGrupo(id:number,grupoBase:GruposDto)
    {
        const grupoFind = await this.dataSorce.getRepository(GruposEntity).findOne({where:{id_grupo:id}});
        if(!grupoFind)
        {
            return new HttpException('No se encontro el grupo',HttpStatus.NOT_FOUND)
        }

        grupoFind.nombre = grupoBase.nombre;

        
    }

}
