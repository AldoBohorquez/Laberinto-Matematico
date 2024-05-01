import { ProfesoresEntity } from "src/profesores/entity/profesores.entity";
import { SalasEntity } from "src/salas/entity/salas.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('grupos')
export class GruposEntity
{
    @PrimaryGeneratedColumn()
    id_grupo:number

    @Column({type:'varchar'})
    nombre:string

    @ManyToOne(()=>ProfesoresEntity,(profesores)=>profesores.grupos)
    profesor:ProfesoresEntity

    @OneToOne(()=>SalasEntity,(salas)=>salas.grupos)
    salas:SalasEntity
}