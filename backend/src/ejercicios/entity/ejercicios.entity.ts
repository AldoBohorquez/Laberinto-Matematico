import { NivelesEntity } from "src/niveles/entity/niveles.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ejercicios')
export class EjerciciosEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    ejercicio:string

    @Column({type:'varchar'})
    respuesta:string

    @Column({type:'varchar'})
    incorrecta:string

    @ManyToOne(()=>NivelesEntity,(niveles)=>niveles.ejercicios,{nullable:true})
    niveles:NivelesEntity
}