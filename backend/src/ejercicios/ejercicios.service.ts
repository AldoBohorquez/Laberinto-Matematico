import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EjerciciosEntity } from './entity/ejercicios.entity';
import { DataSource } from 'typeorm';
import { EjerciciosDto } from './dto/ejercicios.dto';
import { NivelesEntity } from 'src/niveles/entity/niveles.entity';

@Injectable()
export class EjerciciosService {

    constructor(private dataSorce:DataSource)
    {}

    async obtenerEjercicios()
    {
        try {
            return this.dataSorce.getRepository(EjerciciosEntity).find({relations:['niveles']})
        } catch (error) {
            throw new HttpException('Error al obtener los ejercicios',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerEjercicio(id:number)
    {
        try {
            return this.dataSorce.getRepository(EjerciciosEntity).findOne({where:{id:id},relations:['niveles']})
        } catch (error) {
            throw new HttpException('Error al obtener el ejercicio',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarEjercicio(bodyEjercicios:EjerciciosDto)
    {
        try {
            const baseEjercicios = await this.dataSorce.getRepository(EjerciciosEntity).create(bodyEjercicios)

            const nivelesFind = await this.dataSorce.getRepository(NivelesEntity).findOne({where:{id_niveles:bodyEjercicios.nivelesId}})


            nivelesFind.ejercicios.push(baseEjercicios)

            baseEjercicios.niveles = nivelesFind

            await this.dataSorce.getRepository(NivelesEntity).save(nivelesFind)

            return this.dataSorce.getRepository(EjerciciosEntity).save(baseEjercicios)
        } catch (error) {
            throw new HttpException('Error al agregar el ejercicio',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarEjercicio(id:number)
    {
        try {
            return this.dataSorce.getRepository(EjerciciosEntity).delete(id)
        } catch (error) {
            throw new HttpException('Error al eliminar el ejercicio',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarEjercicio(id:number,bodyEjercicios:EjerciciosDto)
    {
        try {
            const ejercicioFind = await this.dataSorce.getRepository(EjerciciosEntity).findOne({where:{id:id},relations:['niveles']})

            const nivelesFind = await this.dataSorce.getRepository(NivelesEntity).findOne({where:{id_niveles:bodyEjercicios.nivelesId}})


            ejercicioFind.niveles = nivelesFind;

            return this.dataSorce.getRepository(EjerciciosEntity).update(ejercicioFind,bodyEjercicios)

        } catch (error) {
            throw new HttpException('Error al actualizar el ejercicio',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
