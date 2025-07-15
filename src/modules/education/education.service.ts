import { Injectable, NotFoundException } from '@nestjs/common';
import { EducationRepository } from './education.repository';
import { EducationMapper } from './education.mapper';
import { CreateEducationDto, UpdateEducationDto, EducationResponseDto } from './education.dto';

@Injectable()
export class EducationService {
    constructor(private readonly repo: EducationRepository) {}

    async create(dto: CreateEducationDto): Promise<EducationResponseDto> {
        const created = await this.repo.create({
        cv: { connect: { id: dto.cvId } },
        school: dto.school,
        degree: dto.degree,
        field: dto.field,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        });

        return EducationMapper.toResponseDto(created);
    }

    async findOne(id: string): Promise<EducationResponseDto> {
        const education = await this.repo.findOne(id);
        if (!education) throw new NotFoundException('Education not found');
        return EducationMapper.toResponseDto(education);
    }

    async findAllByCvId(cvId: string): Promise<EducationResponseDto[]> {
        const list = await this.repo.findAllByCvId(cvId);
        return list.map(EducationMapper.toResponseDto);
    }

    async update(id: string, dto: UpdateEducationDto): Promise<EducationResponseDto> {
        const existing = await this.repo.findOne(id);
        if (!existing) throw new NotFoundException('Education not found');

        const updated = await this.repo.update(id, {
        school: dto.school,
        degree: dto.degree,
        field: dto.field,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        });

        return EducationMapper.toResponseDto(updated);
    }

    async delete(id: string): Promise<EducationResponseDto> {
        const deleted = await this.repo.delete(id);
        return EducationMapper.toResponseDto(deleted);
    }
}
