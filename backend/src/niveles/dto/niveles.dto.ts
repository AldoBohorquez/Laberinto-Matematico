import { IsNumber, IsString } from "class-validator"

export class nivelesDto
{
    @IsNumber()
    id_niveles:number

    @IsString()
    name:string

    @IsNumber()
    ejerciciosId:number

}