import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto } from './template.dto';
import { Template } from '@prisma/client';

@Injectable()
export class TemplatesService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateTemplateDto): Promise<Template> {
        return this.prisma.template.create({
            data: dto,
        });
    }

    async findAll(): Promise<Template[]> {
        return this.prisma.template.findMany();
    }

    async findOne(id: string): Promise<Template> {
        const template = await this.prisma.template.findUnique({
            where: { id },
        });
        if (!template) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }
        return template;
    }

    async update(id: string, dto: UpdateTemplateDto): Promise<Template> {
        await this.findOne(id);
        return this.prisma.template.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: string): Promise<Template> {
        const templateInUse = await this.prisma.cv.findFirst({
            where: { templateId: id },
        });

        if (templateInUse) {
            throw new BadRequestException('Impossible de supprimer ce template : il est utilisé par un ou plusieurs CV.');
        }

        return this.prisma.template.delete({
            where: { id },
        });
    }
}
