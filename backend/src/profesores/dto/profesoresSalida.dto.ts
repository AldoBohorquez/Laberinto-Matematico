import { IsNumber, IsString } from "class-validator"

export class profesoreSalidaDto
{
    @IsString()
    usuario:string

    @IsString()
    password:string
}