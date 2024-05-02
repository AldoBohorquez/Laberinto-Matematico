import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProfesoresEntity } from './entity/profesores.entity';
import { profesoresDto } from './dto/profesores.dto';
import { GruposEntity } from 'src/grupos/entity/grupos.entity';

@Injectable()
export class ProfesoresService {

    constructor(private dataSource: DataSource) { }

    async obtenerProfesores()
    {
        try {
            return await this.dataSource.getRepository(ProfesoresEntity).find({relations: ['grupos'],select: ['id','nombreCompleto','usuario']});
        } catch (error) {

            throw new HttpException("Error al obtener los profesores",HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }

    async obtenerProfesor(id:number)
    {
        try {
            return await this.dataSource.getRepository(ProfesoresEntity).findOne({where:{id:id},relations: ['grupos'],select: ['id','nombreCompleto','usuario']});
        } catch (error) {
            throw new HttpException("Error al obtener el profesor",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarProfesor(profesorBase: profesoresDto) {
        try {
            const nuevoProfesor = await this.dataSource.getRepository(ProfesoresEntity).create(profesorBase);

            const encryptedPassword = await this.encryptPassword(profesorBase.password);
            nuevoProfesor.password = encryptedPassword;

            const gruposFind = await this.dataSource.getRepository(GruposEntity).findOne({ where: { id_grupo: profesorBase.gruposId } });

            nuevoProfesor.grupos.push(gruposFind);

            gruposFind.profesor = nuevoProfesor;

            await this.dataSource.getRepository(GruposEntity).save(gruposFind);

            return await this.dataSource.getRepository(ProfesoresEntity).save(nuevoProfesor);
        } catch (error) {
            throw new HttpException("Error al agregar el profesor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async encryptPassword(password: string): Promise<string> {
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    async eliminarProfesor(id:number)
    {
        try {
            return await this.dataSource.getRepository(ProfesoresEntity).delete(id);
        } catch (error) {
            throw new HttpException("Error al eliminar el profesor",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarProfesor(id:number,profesorBase:profesoresDto)
    {
        try {
            const profesorFind = await this.dataSource.getRepository(ProfesoresEntity).findOne({where:{id:id}});

            const gruposFind = await this.dataSource.getRepository(GruposEntity).findOne({where:{id_grupo:profesorBase.gruposId}});

            profesorFind.grupos = [gruposFind];

            gruposFind.profesor = profesorFind;

            await this.dataSource.getRepository(GruposEntity).save(gruposFind);

            return await this.dataSource.getRepository(ProfesoresEntity).update(profesorFind,profesorBase);
        } catch (error) {
            throw new HttpException("Error al actualizar el profesor",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async loginProfesor(usuario: string, password: string) {
        try {
            const profesorFind = await this.dataSource.getRepository(ProfesoresEntity).findOne({ where: { usuario: usuario },relations: ['grupos'],select: ['id','nombreCompleto','usuario']});

            if (!profesorFind) {
                throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }

            const bcrypt = require('bcrypt');
            const isPasswordValid = await bcrypt.compare(password, profesorFind.password);

            if (!isPasswordValid) {
                throw new HttpException("Contraseña incorrecta", HttpStatus.UNAUTHORIZED);
            }

            return profesorFind;
        } catch (error) {
            throw new HttpException("Error al iniciar sesión", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
