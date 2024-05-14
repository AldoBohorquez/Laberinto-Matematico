import { IsNumber, IsString } from "class-validator"

export class profesoresDto
{
    @IsNumber()
    id:number

    @IsString()
    nombreCompleto:string

    @IsString()
    usuario:string

    @IsString()
    password:string

}