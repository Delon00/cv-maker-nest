import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { ExperienceService } from './experiences.service';
import { CreateExperienceDto, UpdateExperienceDto, ExperienceResponseDto } from './experiences.dto';

@Controller('experiences')
export class ExperienceController {
    constructor(private readonly service: ExperienceService) {}

    @Post()
    async create(@Body() dto: CreateExperienceDto): Promise<ExperienceResponseDto> {
        return this.service.create(dto);
    }

    @Get('cv/:cvId')
    async findAllByCv(@Param('cvId') cvId: string): Promise<ExperienceResponseDto[]> {
        return this.service.findAllByCvId(cvId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ExperienceResponseDto> {
        return this.service.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateExperienceDto,
    ): Promise<ExperienceResponseDto> {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ExperienceResponseDto> {
        return this.service.delete(id);
    }
}
