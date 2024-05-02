import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AlumnosEntity } from './entity/alumnos.entity';
import { AlumnosDto } from './dto/alumnos.dto';

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

            const puntuacionFind = await this.dataSorce.getRepository(AlumnosEntity).findOne({where:{id:bodyAlumnos.puntuacionesId}})
        } catch (error) {
            
        }
    }

}
