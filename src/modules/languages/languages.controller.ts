import {Controller,Get,Post,Put,Delete,Body,Param,ParseUUIDPipe,HttpCode,HttpStatus,} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto, UpdateLanguageDto } from './language.dto';

    @Controller('cvs/:cvId/languages')
    export class LanguagesController {
    constructor(private readonly languageService: LanguagesService) {}

    @Post()
    async create(
        @Param('cvId', ParseUUIDPipe) cvId: string,
        @Body() dto: CreateLanguageDto,
    ) {
        return this.languageService.create(cvId, dto);
    }

    @Get()
    async findAll(@Param('cvId', ParseUUIDPipe) cvId: string) {
        return this.languageService.findAllByCv(cvId);
    }

    @Get(':id')
    async findOne(
        @Param('cvId', ParseUUIDPipe) cvId: string,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.languageService.findOne(id, cvId);
    }

    @Put(':id')
    async update(
        @Param('cvId', ParseUUIDPipe) cvId: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateLanguageDto,
    ) {
        return this.languageService.update(id, cvId, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('cvId', ParseUUIDPipe) cvId: string,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.languageService.delete(id, cvId);
    }
}
