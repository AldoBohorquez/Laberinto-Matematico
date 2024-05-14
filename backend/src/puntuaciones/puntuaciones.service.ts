import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PuntuacionesEntity } from './entity/puntuaciones.entity';
import { puntuacionesDto } from './dto/puntuaciones.dto';
import { NivelesEntity } from 'src/niveles/entity/niveles.entity';
import { AlumnosEntity } from 'src/alumnos/entity/alumnos.entity';

@Injectable()
export class PuntuacionesService {

    constructor(private dataSource:DataSource) 
    {

    }

    async obtenerPuntuaciones()
    {
        try {
            const puntuaciones =  await this.dataSource.getRepository(PuntuacionesEntity).find({relations:['alumnos']});
            if (!puntuaciones) {
                return new HttpException("No se encontraron puntuaciones",HttpStatus.NOT_FOUND)
            }
            return puntuaciones;
        } catch (error) {
            throw new HttpException("Error al obtener las puntuaciones",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerPuntuacion(id:number)
    {
        try {
            const puntuacionFind = await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:id},relations:['alumnos']});
            if (!puntuacionFind) {
                return new HttpException("No se encontro la puntuacion",HttpStatus.NOT_FOUND)
            }
            return puntuacionFind;
        } catch (error) {
            throw new HttpException("Error al obtener la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarPuntuacion(puntuacionBase:puntuacionesDto)
    {
        try {
            const nuevaPuntuacion = await this.dataSource.getRepository(PuntuacionesEntity).create(puntuacionBase);

            const alumnoFind = await this.dataSource.getRepository(AlumnosEntity).findOne({where:{id:puntuacionBase.alumnosId}});
            if (!alumnoFind) {
                return new HttpException("No se encontro el alumno",HttpStatus.NOT_FOUND)
            }

            const savePuntuacion = await this.dataSource.getRepository(PuntuacionesEntity).save(nuevaPuntuacion);

            alumnoFind.puntuaciones.push(savePuntuacion);

            await this.dataSource.getRepository(AlumnosEntity).save(alumnoFind);

            return savePuntuacion
        } catch (error) {
            throw new HttpException("Error al agregar la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarPuntuacion(id:number)
    {
        try {
            const puntuacionFind = await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:id}});
            if (!puntuacionFind) {
                return new HttpException("No se encontro la puntuacion",HttpStatus.NOT_FOUND)
            }

            return await this.dataSource.getRepository(PuntuacionesEntity).remove(puntuacionFind);
        } catch (error) {
            throw new HttpException("Error al eliminar la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
