import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLanguageDto, UpdateLanguageDto } from './language.dto';

@Injectable()
export class LanguageRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(cvId: string, dto: CreateLanguageDto) {
        return this.prisma.language.create({
        data: {
            cvId,
            ...dto,
        },
        });
    }

    findAllByCv(cvId: string) {
        return this.prisma.language.findMany({
        where: { cvId },
        });
    }

    findOne(id: string, cvId: string) {
        return this.prisma.language.findFirst({
        where: { id, cvId },
        });
    }

    update(id: string, dto: UpdateLanguageDto) {
        return this.prisma.language.update({
        where: { id },
        data: dto,
        });
    }

    delete(id: string) {
        return this.prisma.language.delete({
        where: { id },
        });
    }
}
