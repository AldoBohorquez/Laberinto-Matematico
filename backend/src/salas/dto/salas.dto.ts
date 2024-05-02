import { IsBoolean, IsDate, IsNumber } from "class-validator"

export class salasDto {

    @IsNumber()
    id:number

    @IsBoolean()
    active:boolean

    @IsNumber()
    gruposId:number

    @IsDate()
    activeDate:Date

    @IsDate()
    desactiveDate:Date
}