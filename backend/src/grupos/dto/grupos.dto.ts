import { IsNumber, IsString } from "class-validator";

export class GruposDto {

    @IsString()
    nombre: string;

    @IsNumber()
    alumnosId: number;

    @IsNumber()
    profesorId:number

    @IsNumber()
    salasId:number
}