import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { CreateInterestDto, UpdateInterestDto } from './interest.dto';

@Controller('cv/:cvId/interests')
export class InterestsController {
    constructor(private service: InterestsService) {}

    @Post()
    create(@Param('cvId') cvId: string, @Body() dto: CreateInterestDto) {
        return this.service.create(cvId, dto);
    }

    @Get()
    findAll(@Param('cvId') cvId: string) {
        return this.service.findAll(cvId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateInterestDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
