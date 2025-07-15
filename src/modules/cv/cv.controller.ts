import {Controller, Get, Post, Body,Param, Delete, Put, UseGuards, Req, ParseIntPipe,} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {CreateCvDto,UpdateCvDto,} from './dto/cv.dto';
import { CvService } from './cv.service';

@Controller('cvs')
@UseGuards(AuthGuard('jwt'))
export class CvController {
    constructor(private readonly cvService: CvService) {}

    @Post()
    create(@Req() req, @Body() createCvDto: CreateCvDto) {
        return this.cvService.create(req.user.id, createCvDto);
    }

    @Get()
    findAll(@Req() req) {
        return this.cvService.findAllByUser(req.user.id);
    }

    @Get(':id')
    findOne(@Req() req, @Param('id', ParseIntPipe) id: string) {
        return this.cvService.findOne(id, req.user.id);
    }

    @Put(':id')
    update(
        @Req() req,
        @Param('id', ParseIntPipe) id: string,
        @Body() updateCvDto: UpdateCvDto,
    ) {
        return this.cvService.update(id, req.user.id, updateCvDto);
    }

    @Delete(':id')
    remove(@Req() req, @Param('id', ParseIntPipe) id: string) {
        return this.cvService.remove(id, req.user.id);
    }
}
