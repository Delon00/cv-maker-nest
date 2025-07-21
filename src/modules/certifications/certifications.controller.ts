import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto, UpdateCertificationDto } from './certification.dto';

@Controller('cv/:cvId/certifications')
export class CertificationsController {
    constructor(private service: CertificationsService) {}

    @Post()
    create(@Param('cvId') cvId: string, @Body() dto: CreateCertificationDto) {
        return this.service.create(cvId, dto);
    }

    @Get()
    findAll(@Param('cvId') cvId: string) {
        return this.service.findAll(cvId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCertificationDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
