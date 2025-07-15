import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { SkillService } from './skills.service';
import { CreateSkillDto, UpdateSkillDto, SkillResponseDto } from './skills.dto';

@Controller('skills')
export class SkillController {
    constructor(private readonly service: SkillService) {}

    @Post()
    async create(@Body() dto: CreateSkillDto): Promise<SkillResponseDto> {
        return this.service.create(dto);
    }

    @Get('cv/:cvId')
    async findAllByCv(@Param('cvId') cvId: string): Promise<SkillResponseDto[]> {
        return this.service.findAllByCvId(cvId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<SkillResponseDto> {
        return this.service.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateSkillDto,
    ): Promise<SkillResponseDto> {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<SkillResponseDto> {
        return this.service.delete(id);
    }
}
