import { AlumnosEntity } from "src/alumnos/entity/alumnos.entity";
import { NivelesEntity } from "src/niveles/entity/niveles.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('puntuaciones')
export class PuntuacionesEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    puntuacionObtenida:number

    @ManyToOne(()=>AlumnosEntity,(alumnos)=>alumnos.puntuaciones)
    alumnos:AlumnosEntity

    @OneToOne(()=>NivelesEntity,(niveles)=>niveles.puntuaciones)
    @JoinColumn()
    niveles:NivelesEntity
    
}