import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('puntuaciones')
export class PuntuacionesEntity
{
    @PrimaryGeneratedColumn()
    id:number

    
}