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
            return await this.dataSource.getRepository(PuntuacionesEntity).find({relations:['niveles','alumnos']});
        } catch (error) {
            throw new HttpException("Error al obtener las puntuaciones",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerPuntuacion(id:number)
    {
        try {
            return await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:id},relations:['niveles','alumnos']});
        } catch (error) {
            throw new HttpException("Error al obtener la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarPuntuacion(puntuacionBase:puntuacionesDto)
    {
        try {

            const nuevaPuntuacion = await this.dataSource.getRepository(PuntuacionesEntity).create(puntuacionBase);

            const nivelesFind = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:puntuacionBase.nivelesId}});

            const alumnosFind = await this.dataSource.getRepository(AlumnosEntity).findOne({where:{id:puntuacionBase.alumnosId}});

            nuevaPuntuacion.niveles = nivelesFind;

            nuevaPuntuacion.alumnos = alumnosFind;

            nivelesFind.puntuaciones = nuevaPuntuacion;

            alumnosFind.puntuaciones.push(nuevaPuntuacion);

            await this.dataSource.getRepository(NivelesEntity).save(nivelesFind);

            await this.dataSource.getRepository(AlumnosEntity).save(alumnosFind);

            return await this.dataSource.getRepository(PuntuacionesEntity).save(nuevaPuntuacion);

        } catch (error) {
            throw new HttpException("Error al agregar la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarPuntuacion(id:number)
    {
        try {
            return await this.dataSource.getRepository(PuntuacionesEntity).delete(id);
        } catch (error) {

            throw new HttpException("Error al eliminar la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarPuntuacion(id:number,puntuacionBase:puntuacionesDto)
    {
        try {
            const puntuacionFind = await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:id}});

            const nivelesFind = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:puntuacionBase.nivelesId}});

            const alumnosFind = await this.dataSource.getRepository(AlumnosEntity).findOne({where:{id:puntuacionBase.alumnosId}});

            puntuacionFind.niveles = nivelesFind;

            puntuacionFind.alumnos = alumnosFind;

            nivelesFind.puntuaciones = puntuacionFind;

            alumnosFind.puntuaciones.push(puntuacionFind);

            await this.dataSource.getRepository(NivelesEntity).save(nivelesFind);

            await this.dataSource.getRepository(AlumnosEntity).save(alumnosFind);

            return await this.dataSource.getRepository(PuntuacionesEntity).update(puntuacionFind,puntuacionBase);

        } catch (error) {
            throw new HttpException("Error al actualizar la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
