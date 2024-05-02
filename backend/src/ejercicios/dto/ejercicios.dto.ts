import { IsNumber, IsString, isString } from "class-validator";

export class EjerciciosDto {

    @IsNumber()
    id: number

    @IsString()
    ejercicio: string

    @IsString()
    respuesta: string

    @IsString()
    incorrecta: string

    @IsNumber()
    nivelesId: number
}