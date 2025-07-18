import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceRepository } from './experiences.repository';
import { ExperienceMapper } from './experiences.mapper';
import { CreateExperienceDto, UpdateExperienceDto, ExperienceResponseDto } from './experiences.dto';

@Injectable()
export class ExperienceService {
    constructor(private readonly repo: ExperienceRepository) {}

    async create(dto: CreateExperienceDto): Promise<ExperienceResponseDto> {
        const exp = await this.repo.create({
            cv: { connect: { id: dto.cvId } },
            company: dto.company,
            jobTitle: dto.jobTitle,
            location: dto.location,
            startMonth: dto.startMonth,
            startYear: dto.startYear,
            endMonth: dto.endMonth ? dto.endMonth : null,
            endYear: dto.endYear ? dto.endYear : null,
        });
        return ExperienceMapper.toResponseDto(exp);
    }

    async findOne(id: string): Promise<ExperienceResponseDto> {
        const exp = await this.repo.findOne(id);
        if (!exp) throw new NotFoundException('Experience not found');
        return ExperienceMapper.toResponseDto(exp);
    }

    async findAllByCvId(cvId: string): Promise<ExperienceResponseDto[]> {
        const exps = await this.repo.findAllByCvId(cvId);
        return ExperienceMapper.toResponseDtoList(exps);
    }

    async update(id: string, dto: UpdateExperienceDto): Promise<ExperienceResponseDto> {
        const existing = await this.repo.findOne(id);
        if (!existing) throw new NotFoundException('Experience not found');

        const updated = await this.repo.update(id, {
            company: dto.company,
            location: dto.location,
            description: dto.description,
            startMonth: dto.startMonth,
            startYear: dto.startYear,
            endMonth: dto.endMonth ? dto.endMonth : null,
            endYear: dto.endYear ? dto.endYear : null,
        });

        return ExperienceMapper.toResponseDto(updated);
    }

    async delete(id: string): Promise<ExperienceResponseDto> {
        const deleted = await this.repo.delete(id);
        return ExperienceMapper.toResponseDto(deleted);
    }
}
