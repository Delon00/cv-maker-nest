import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Education } from '@prisma/client';

@Injectable()
export class EducationRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: Prisma.EducationCreateInput): Promise<Education> {
        return this.prisma.education.create({ data });
    }

    findOne(id: string): Promise<Education | null> {
        return this.prisma.education.findUnique({ where: { id } });
    }

    findAllByCvId(cvId: string): Promise<Education[]> {
        return this.prisma.education.findMany({ where: { cvId } });
    }

    update(id: string, data: Prisma.EducationUpdateInput): Promise<Education> {
        return this.prisma.education.update({ where: { id }, data });
    }

    delete(id: string): Promise<Education> {
        return this.prisma.education.delete({ where: { id } });
    }
}
