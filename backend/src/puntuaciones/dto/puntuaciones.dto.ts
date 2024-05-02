import { IsNumber } from "class-validator"

export class puntuacionesDto
{
    @IsNumber()
    id:number

    @IsNumber()
    puntuacionObtenida:number

    @IsNumber()
    alumnosId:number

    @IsNumber()
    nivelesId:number
}