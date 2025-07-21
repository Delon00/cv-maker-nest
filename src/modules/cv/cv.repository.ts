import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCvDto, UpdateCvDto } from './cv.dto';

const fullInclude = {educations: true, experiences: true, skills: true, template: true, languages: true, interests: true,certifications: true,};

@Injectable()
export class CvRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: string | undefined, createCvDto: CreateCvDto) {
        if (!userId) {
            throw new Error('Il faut le id utilisateur pour cette requête');
        }

        const {templateId,experiences,educations,languages,certifications,interests,skills,cvName,...rest} = createCvDto;

        const existingCv = await this.prisma.cv.findFirst({
            where: {
            userId,
            cvName,
            },
        });

        if (existingCv) {
            throw new ConflictException({
            message: 'Un CV avec ce nom existe déjà.',
            existingCvId: existingCv.id,
            });
        }

        return this.prisma.cv.create({
            data: {
            ...rest,
            cvName,
            user: { connect: { id: userId } },
            template: { connect: { id: templateId } },
            experiences: experiences?.length ? { create: experiences } : undefined,
            educations: educations?.length ? { create: educations } : undefined,
            languages: languages?.length ? { create: languages } : undefined,
            certifications: certifications?.length ? { create: certifications } : undefined,
            interests: interests?.length ? { create: interests } : undefined,
            skills: skills?.length ? { create: skills } : undefined,
            },
            include: fullInclude,
        });
    }

    async findAllByUser(userId: string) {
        return this.prisma.cv.findMany({
        where: { userId },
        include: fullInclude,
        });
    }

    async findOneByUser(id: string, userId: string) {
        const cv = await this.prisma.cv.findFirst({
        where: { id, userId },
        include: fullInclude,
        });

        if (!cv) throw new NotFoundException('CV not found');
        return cv;
    }

    async findByName(cvName: string, userId: string) {
        return this.prisma.cv.findFirst({
            where: { cvName, userId },
            include: fullInclude,
        });
    }


    async update(id: string, userId: string, updateCvDto: UpdateCvDto) {
        await this.findOneByUser(id, userId);

        const {
        experiences,
        educations,
        languages,
        certifications,
        interests,
        skills,
        ...rest
        } = updateCvDto;



        return this.prisma.cv.update({
        where: { id },
        data: {
            ...rest,

        },
        include: fullInclude,
        });
    }

    async remove(id: string, userId: string) {
        await this.findOneByUser(id, userId);
        return this.prisma.cv.delete({
        where: { id },
        });
    }
}
