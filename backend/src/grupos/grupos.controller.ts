import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposDto } from './dto/grupos.dto';

@Controller('grupos')
export class GruposController {

    constructor(private service: GruposService) {}
    
}
