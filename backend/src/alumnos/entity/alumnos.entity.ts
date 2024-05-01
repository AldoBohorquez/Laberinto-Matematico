import { PuntuacionesEntity } from "src/puntuaciones/entity/puntuaciones.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('alumnos')
export class AlumnosEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    nombre:string

    @OneToMany(()=>PuntuacionesEntity,(puntuaciones)=>puntuaciones.alumnos)
    puntuaciones:PuntuacionesEntity[]
}