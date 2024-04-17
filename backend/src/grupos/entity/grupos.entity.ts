import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('grupos')
export class GruposEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre:string

    
}