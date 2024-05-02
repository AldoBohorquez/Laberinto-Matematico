import { IsNumber, IsString } from "class-validator"

export class profesoreSalidaDto
{
    @IsNumber()
    id:number

    @IsString()
    nombreCompleto:string

    @IsString()
    usuario:string

    @IsNumber()
    gruposId:number
}