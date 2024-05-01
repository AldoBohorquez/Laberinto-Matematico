import { ProfesoresEntity } from "src/profesores/entity/profesores.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('grupos')
export class GruposEntity
{
    @PrimaryGeneratedColumn()
    id_grupo:number

    @Column({type:'varchar'})
    nombre:string

    @ManyToOne(()=>ProfesoresEntity,(profesores)=>profesores.grupos)
    profesor:ProfesoresEntity
}