import { Injectable, NotFoundException } from '@nestjs/common';
import { SkillRepository } from './skills.repository';
import { SkillMapper } from './skills.mapper';
import { CreateSkillDto, UpdateSkillDto, SkillResponseDto } from './skills.dto';

@Injectable()
export class SkillService {
    constructor(private readonly repo: SkillRepository) {}

    async create(dto: CreateSkillDto): Promise<SkillResponseDto> {
        const skill = await this.repo.create({
        cv: { connect: { id: dto.cvId } },
        name: dto.name,
        });
        return SkillMapper.toResponseDto(skill);
    }

    async findOne(id: string): Promise<SkillResponseDto> {
        const skill = await this.repo.findOne(id);
        if (!skill) throw new NotFoundException('Skill not found');
        return SkillMapper.toResponseDto(skill);
    }

    async findAllByCvId(cvId: string): Promise<SkillResponseDto[]> {
        const skills = await this.repo.findAllByCvId(cvId);
        return SkillMapper.toResponseDtoList(skills);
    }

    async update(id: string, dto: UpdateSkillDto): Promise<SkillResponseDto> {
        const existing = await this.repo.findOne(id);
        if (!existing) throw new NotFoundException('Skill not found');

        const updated = await this.repo.update(id, {
        name: dto.name,
        });

        return SkillMapper.toResponseDto(updated);
    }

    async delete(id: string): Promise<SkillResponseDto> {
        const deleted = await this.repo.delete(id);
        return SkillMapper.toResponseDto(deleted);
    }
}
