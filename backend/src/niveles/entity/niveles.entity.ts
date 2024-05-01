import { IsNumber, IsString, isString } from "class-validator";
import { EjerciciosEntity } from "src/ejercicios/entity/ejercicios.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('niveles')
export class NivelesEntity
{

    @PrimaryGeneratedColumn()
    id_niveles:number

    @Column({type:'varchar'})
    name:string

    @OneToMany(()=>EjerciciosEntity,(ejercicios)=>ejercicios.niveles)
    ejercicios:EjerciciosEntity[]

}