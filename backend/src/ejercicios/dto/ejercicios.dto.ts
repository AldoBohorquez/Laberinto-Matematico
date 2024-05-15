import { IsArray, IsNumber, IsString, isString } from "class-validator";

export class EjerciciosDto {

    @IsString()
    ejercicio: string

    @IsNumber()
    respuestasId: number

    @IsNumber()
    nivelesId: number
}