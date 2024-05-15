import { IsNumber, IsString } from "class-validator"

export class puntuacionesDto
{

    @IsNumber()
    puntuacionObtenida:number

    @IsNumber()
    alumnosId:number

    @IsString()
    nivel:string
}