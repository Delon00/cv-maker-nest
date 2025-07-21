import { Injectable, NotFoundException } from '@nestjs/common';
import { InterestRepository } from './interest.repository';
import { CreateInterestDto, UpdateInterestDto } from './interest.dto';
import { InterestMapper } from './interest.mapper';

@Injectable()
export class InterestsService {
    constructor(private repo: InterestRepository) {}

    async create(cvId: string, dto: CreateInterestDto) {
        const interest = await this.repo.create(cvId, dto);
        return InterestMapper.toDto(interest);
    }

    async findAll(cvId: string) {
        const list = await this.repo.findAll(cvId);
        return list.map(InterestMapper.toDto);
    }

    async update(id: string, dto: UpdateInterestDto) {
        const existing = await this.repo.findOne(id);
        if (!existing) throw new NotFoundException('Interest not found');
        const updated = await this.repo.update(id, dto);
        return InterestMapper.toDto(updated);
    }

    async remove(id: string) {
        await this.repo.delete(id);
    }
}
