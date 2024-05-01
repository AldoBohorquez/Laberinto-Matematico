import { GruposEntity } from "src/grupos/entity/grupos.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('salas')
export class SalasEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'boolean'})
    active:boolean

    @OneToOne(()=>GruposEntity,(grupos)=>grupos.salas)
    grupos:GruposEntity
}