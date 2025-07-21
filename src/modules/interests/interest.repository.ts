import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInterestDto, UpdateInterestDto } from './interest.dto';

@Injectable()
export class InterestRepository {
    constructor(private prisma: PrismaService) {}

    create(cvId: string, dto: CreateInterestDto) {
        return this.prisma.interest.create({
        data: { ...dto, cvId },
        });
    }

    findAll(cvId: string) {
        return this.prisma.interest.findMany({ where: { cvId } });
    }

    findOne(id: string) {
        return this.prisma.interest.findUnique({ where: { id } });
    }

    update(id: string, dto: UpdateInterestDto) {
        return this.prisma.interest.update({ where: { id }, data: dto });
    }

    delete(id: string) {
        return this.prisma.interest.delete({ where: { id } });
    }
}
