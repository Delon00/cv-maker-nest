import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {CreateCvDto,UpdateCvDto,} from './dto/cv.dto';

    @Injectable()
    export class CvService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, createCvDto: CreateCvDto) {
        return this.prisma.cv.create({
            data: {userId,...createCvDto,},
        });
    }

    async findAllByUser(userId: string) {
        return this.prisma.cv.findMany({
        where: { userId },
        include: {
            educations: true,
            experiences: true,
            skills: true,
            template: true,
        },
        });
    }

    async findOne(id: string, userId: string) {
        const cv = await this.prisma.cv.findFirst({
        where: { id, userId },
        include: {
            educations: true,
            experiences: true,
            skills: true,
            template: true,
        },
        });
        if (!cv) throw new NotFoundException('CV not found');
        return cv;
    }

    async update(id: string, userId: string, updateCvDto: UpdateCvDto) {
        await this.findOne(id, userId);
        return this.prisma.cv.update({
        where: { id },
        data: updateCvDto,
        });
    }

    async remove(id: string, userId: string) {
        await this.findOne(id, userId);
        return this.prisma.cv.delete({
        where: { id },
        });
    }
}
