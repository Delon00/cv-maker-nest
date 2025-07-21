import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates-cv.service';
import { CreateTemplateDto, UpdateTemplateDto } from './template.dto';
import { Template } from '@prisma/client';
import { AdminGuard } from '../admin/admin.guard';


@Controller('templates')
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() dto: CreateTemplateDto): Promise<Template> {
        return this.templatesService.create(dto);
    }

    @Get('all')
    findAll(): Promise<Template[]> {
        return this.templatesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Template> {
        return this.templatesService.findOne(id);
    }

    @UseGuards(AdminGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTemplateDto): Promise<Template> {
        return this.templatesService.update(id, dto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Template> {
        return this.templatesService.remove(id);
    }
}
