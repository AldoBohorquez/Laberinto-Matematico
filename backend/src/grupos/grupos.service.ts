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
            return this.dataSorce.getRepository(GruposEntity).find({relations:['alumnos','profesores','salas']})
        } catch (error) {
            throw new HttpException('Error al obtener los grupos',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerGrupo(id:number)
    {
        try {
            return this.dataSorce.getRepository(GruposEntity).findOne({where:{id_grupo:id},relations:['alumnos','profesores','salas']})
        } catch (error) {
            throw new HttpException('Error al obtener el grupo',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarGrupo(bodyGrupos:GruposDto)
    {
        try {
            const cuerpoGrupos = await this.dataSorce.getRepository(GruposEntity).create(bodyGrupos)

            const profesoresFind = await this.dataSorce.getRepository(ProfesoresEntity).findOne({where:{id:bodyGrupos.profesorId}})

            const salasFind = await this.dataSorce.getRepository(SalasEntity).findOne({where:{id:bodyGrupos.salasId}})

            const alumnosFind = await this.dataSorce.getRepository(AlumnosEntity).findOne({where:{id:bodyGrupos.alumnosId}})

            cuerpoGrupos.alumnos.push(alumnosFind)

            cuerpoGrupos.salas = salasFind

            profesoresFind.grupos.push(cuerpoGrupos)

            cuerpoGrupos.profesor = profesoresFind


            profesoresFind.grupos.push(cuerpoGrupos)

            salasFind.grupos= cuerpoGrupos

            alumnosFind.grupos = cuerpoGrupos

            await this.dataSorce.getRepository(ProfesoresEntity).save(profesoresFind)

            return this.dataSorce.getRepository(GruposEntity).save(cuerpoGrupos)
        } catch (error) {
            throw new HttpException('Error al agregar el grupo',HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }

    async eliminarGrupo(id:number)
    {
        try {
            return this.dataSorce.getRepository(GruposEntity).delete(id)
        } catch (error) {
            throw new HttpException('Error al eliminar el grupo',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarGrupo(id:number,bodyGrupos:GruposDto)
    {
        try {

            const grupoFind = await this.dataSorce.getRepository(GruposEntity).findOne({where:{id_grupo:id},relations:['alumnos','profesores','salas']})

            const profesoresFind = await this.dataSorce.getRepository(ProfesoresEntity).findOne({where:{id:bodyGrupos.profesorId}})

            const salasFind = await this.dataSorce.getRepository(SalasEntity).findOne({where:{id:bodyGrupos.salasId}})

            const alumnosFind = await this.dataSorce.getRepository(AlumnosEntity).findOne({where:{id:bodyGrupos.alumnosId}})

            grupoFind.alumnos.push(alumnosFind)
        
            grupoFind.profesor = profesoresFind

            grupoFind.salas = salasFind

            await this.dataSorce.getRepository(AlumnosEntity).save(alumnosFind)
            await this.dataSorce.getRepository(ProfesoresEntity).save(profesoresFind)
            await this.dataSorce.getRepository(SalasEntity).save(salasFind)

            return this.dataSorce.getRepository(GruposEntity).update(grupoFind,bodyGrupos)

        } catch (error) {
            throw new HttpException('Error al actualizar el grupo',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
