import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AlumnosEntity } from './entity/alumnos.entity';
import { AlumnosDto } from './dto/alumnos.dto';
import { PuntuacionesEntity } from 'src/puntuaciones/entity/puntuaciones.entity';

@Injectable()
export class AlumnosService {

    constructor(private dataSorce:DataSource)
    {}

    async obtenerAlumnos()
    {
        try {
            return await this.dataSorce.getRepository(AlumnosEntity).find({relations:['puntuaciones']})

        } catch (error) {
            throw new HttpException('Error al obtener los alumnos',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerAlumno(id:number)
    {
        try {
            return await this.dataSorce.getRepository(AlumnosEntity).findOne({where:{id:id},relations:['puntuaciones']})
        } catch (error) {
            throw new HttpException('Error al obtener el alumno',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarAlumno(bodyAlumnos:AlumnosDto)
    {
        try {

            const baseAlumnos = await this.dataSorce.getRepository(AlumnosEntity).create(bodyAlumnos)

            const puntuacionFind = await this.dataSorce.getRepository(PuntuacionesEntity).findOne({where:{id:bodyAlumnos.puntuacionesId}})

            puntuacionFind.alumnos = baseAlumnos

            baseAlumnos.puntuaciones.push(puntuacionFind)

            await this.dataSorce.getRepository(PuntuacionesEntity).save(puntuacionFind)

            return await this.dataSorce.getRepository(AlumnosEntity).save(baseAlumnos)

        } catch (error) {
            throw new HttpException('Error al agregar el alumno',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarAlumno(id:number)
    {
        try {
            return await this.dataSorce.getRepository(AlumnosEntity).delete(id)
        } catch (error) {
            throw new HttpException('Error al eliminar el alumno',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarAlumno(id:number,bodyAlumnos:AlumnosDto)
    {
        try {

            const baseAlumnos = await this.dataSorce.getRepository(AlumnosEntity).findOne({where:{id:id}})

            const puntuacionFind = await this.dataSorce.getRepository(PuntuacionesEntity).findOne({where:{id:bodyAlumnos.puntuacionesId}})

            if (baseAlumnos) {
                baseAlumnos.puntuaciones = [puntuacionFind];
            } else {
                throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
            }

            return await this.dataSorce.getRepository(AlumnosEntity).update(baseAlumnos,bodyAlumnos)

        } catch (error) {
            throw new HttpException('Error al actualizar el alumno',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
