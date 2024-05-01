import { GruposEntity } from "src/grupos/entity/grupos.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('profesores')
export class ProfesoresEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    nombreCompleto:string

    @Column({type:'varchar',nullable:false})
    usuario:string

    @Column({type:'varchar'})
    password:string

    @OneToMany(()=>GruposEntity,(grupos)=>grupos.profesor)
    grupos:GruposEntity[]
}