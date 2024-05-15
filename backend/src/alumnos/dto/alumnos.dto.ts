import { IsNumber, IsString } from "class-validator";

export class AlumnosDto {

    @IsString()
    nombre:string

    @IsNumber()
    puntuacionesId:number
    gruposId: any;
}