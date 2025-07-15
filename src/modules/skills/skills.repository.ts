import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Skill, Prisma } from '@prisma/client';

@Injectable()
export class SkillRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: Prisma.SkillCreateInput): Promise<Skill> {
        return this.prisma.skill.create({ data });
    }

    findOne(id: string): Promise<Skill | null> {
        return this.prisma.skill.findUnique({ where: { id } });
    }

    findAllByCvId(cvId: string): Promise<Skill[]> {
        return this.prisma.skill.findMany({ where: { cvId } });
    }

    update(id: string, data: Prisma.SkillUpdateInput): Promise<Skill> {
        return this.prisma.skill.update({ where: { id }, data });
    }

    delete(id: string): Promise<Skill> {
        return this.prisma.skill.delete({ where: { id } });
    }
}
