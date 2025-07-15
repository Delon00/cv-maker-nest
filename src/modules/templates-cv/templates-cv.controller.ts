import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TemplatesService } from './templates-cv.service';
import { CreateTemplateDto, UpdateTemplateDto } from './template.dto';
import { Template } from '@prisma/client';

@Controller('templates')
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) {}

    @Post()
    create(@Body() dto: CreateTemplateDto): Promise<Template> {
        return this.templatesService.create(dto);
    }

    @Get()
    findAll(): Promise<Template[]> {
        return this.templatesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Template> {
        return this.templatesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTemplateDto): Promise<Template> {
        return this.templatesService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Template> {
        return this.templatesService.remove(id);
    }
}
