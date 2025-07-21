import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificationDto, UpdateCertificationDto } from './certification.dto';

@Injectable()
export class CertificationRepository {
    constructor(private prisma: PrismaService) {}

    create(cvId: string, dto: CreateCertificationDto) {
        return this.prisma.certification.create({
        data: { ...dto, cvId },
        });
    }

    findAll(cvId: string) {
        return this.prisma.certification.findMany({ where: { cvId } });
    }

    findOne(id: string) {
        return this.prisma.certification.findUnique({ where: { id } });
    }

    update(id: string, dto: UpdateCertificationDto) {
        return this.prisma.certification.update({ where: { id }, data: dto });
    }

    delete(id: string) {
        return this.prisma.certification.delete({ where: { id } });
    }
}
