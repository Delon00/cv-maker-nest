import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto, UpdateEducationDto, EducationResponseDto } from './education.dto';

@Controller('educations')
export class EducationController {
    constructor(private readonly service: EducationService) {}

    @Post()
    async create(@Body() dto: CreateEducationDto): Promise<EducationResponseDto> {
        return this.service.create(dto);
    }

    @Get('cv/:cvId')
    async findAllByCv(@Param('cvId') cvId: string): Promise<EducationResponseDto[]> {
        return this.service.findAllByCvId(cvId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<EducationResponseDto> {
        return this.service.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateEducationDto,
    ): Promise<EducationResponseDto> {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<EducationResponseDto> {
        return this.service.delete(id);
    }
}
