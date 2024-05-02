import { IsNumber, IsString } from "class-validator";

export class GruposDto {

    @IsNumber()
    id: number;

    @IsString()
    nombre: string;

    @IsNumber()
    alumnosId: number;

    @IsNumber()
    nivelesId: number;
}