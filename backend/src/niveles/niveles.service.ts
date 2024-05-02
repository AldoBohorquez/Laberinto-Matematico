import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NivelesEntity } from './entity/niveles.entity';
import { nivelesDto } from './dto/niveles.dto';
import { EjerciciosEntity } from 'src/ejercicios/entity/ejercicios.entity';
import { PuntuacionesEntity } from 'src/puntuaciones/entity/puntuaciones.entity';

@Injectable()
export class NivelesService {

    constructor(private dataSource: DataSource) { }

    async obtenerNiveles()
    {
        try {
            return await this.dataSource.getRepository(NivelesEntity).find({relations: ['ejercicios', 'puntuaciones']});
        } catch (error) {

            throw new HttpException("Error al obtener los niveles",HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }

    async obtenerNivel(id:number)
    {
        try {
            return await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:id},relations: ['ejercicios', 'puntuaciones']});
        } catch (error) {
            throw new HttpException("Error al obtener el nivel",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarNivel(nivelBase:nivelesDto)
    {
        try {
            const nuevoNivel = await this.dataSource.getRepository(NivelesEntity).create(nivelBase);

            const ejerciciosFind = await this.dataSource.getRepository(EjerciciosEntity).findOne({where:{id:nivelBase.ejerciciosId}});

            const puntuacionesFind = await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:nivelBase.puntuacionesId}});


            nuevoNivel.ejercicios.push(ejerciciosFind);

            nuevoNivel.puntuaciones = puntuacionesFind;

            ejerciciosFind.niveles = nuevoNivel

            puntuacionesFind.niveles = nuevoNivel

            await this.dataSource.getRepository(EjerciciosEntity).save(ejerciciosFind);

            await this.dataSource.getRepository(PuntuacionesEntity).save(puntuacionesFind);

            return await this.dataSource.getRepository(NivelesEntity).save(nuevoNivel);

            
        } catch (error) {
            throw new HttpException("Error al agregar el nivel",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarNivel(id:number)
    {
        try {
            const nivelEliminar = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:id}});

            return await this.dataSource.getRepository(NivelesEntity).delete(nivelEliminar);
        } catch (error) {
            throw new HttpException("Error al eliminar el nivel",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarNivel(id:number, nivelBase:nivelesDto)
    {
        try {
            const nivelActualizar = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:id}});

            const ejerciciosFind = await this.dataSource.getRepository(EjerciciosEntity).findOne({where:{id:nivelBase.ejerciciosId}});

            const puntuacionesFind = await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:nivelBase.puntuacionesId}});

            nivelActualizar.ejercicios.push(ejerciciosFind)
            nivelActualizar.puntuaciones = puntuacionesFind;

            await this.dataSource.getRepository(EjerciciosEntity).save(ejerciciosFind);

            await this.dataSource.getRepository(PuntuacionesEntity).save(puntuacionesFind);

            return await this.dataSource.getRepository(NivelesEntity).update(nivelActualizar, nivelBase);
        } catch (error) {
            throw new HttpException("Error al actualizar el nivel",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
