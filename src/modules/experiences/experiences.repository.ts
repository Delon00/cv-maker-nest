import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Experience } from '@prisma/client';

@Injectable()
export class ExperienceRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: Prisma.ExperienceCreateInput): Promise<Experience> {
        return this.prisma.experience.create({ data });
    }

    findOne(id: string): Promise<Experience | null> {
        return this.prisma.experience.findUnique({ where: { id } });
    }

    findAllByCvId(cvId: string): Promise<Experience[]> {
        return this.prisma.experience.findMany({ where: { cvId } });
    }

    update(id: string, data: Prisma.ExperienceUpdateInput): Promise<Experience> {
        return this.prisma.experience.update({ where: { id }, data });
    }

    delete(id: string): Promise<Experience> {
        return this.prisma.experience.delete({ where: { id } });
    }
}
