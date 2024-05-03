import { GruposEntity } from "src/grupos/entity/grupos.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('salas')
export class SalasEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'boolean'})
    active:boolean

    @OneToOne(()=>GruposEntity,(grupos)=>grupos.salas)
    @JoinColumn()
    grupos:GruposEntity

    @Column({type:'date'})
    activeDate:Date

    @Column({type:'date'})
    desactiveDate:Date
}