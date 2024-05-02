import { IsNumber, IsString } from "class-validator";

export class AlumnosDto {

    @IsNumber()
    id:number

    @IsString()
    nombre:string

    @IsNumber()
    puntuacionesId:number
}