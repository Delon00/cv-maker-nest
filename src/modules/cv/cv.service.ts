import { Injectable, NotFoundException } from '@nestjs/common'; 

import { CreateCvDto, UpdateCvDto, CvResponseDto } from './cv.dto';
import { CvMapper } from './cv.mapper';
import { CvRepository } from './cv.repository';

@Injectable()
export class CvService {
    constructor(
        private readonly repo: CvRepository,
        private readonly mapper: CvMapper,
    ) {}

    async create(userId: string, createCvDto: CreateCvDto): Promise<CvResponseDto> {
        const cvEntity = await this.repo.create(userId, createCvDto);
        return this.mapper.toResponseDto(cvEntity);
    }

    async findAllByUser(userId: string): Promise<CvResponseDto[]> {
        const cvs = await this.repo.findAllByUser(userId);
        return cvs.map(cv => this.mapper.toResponseDto(cv));
    }

    async findOneByUser(id: string, userId: string): Promise<CvResponseDto> {
        const cv = await this.repo.findOneByUser(id, userId);
        return this.mapper.toResponseDto(cv);
    }

    async findByName(cvName: string, userId: string): Promise<CvResponseDto | null> {
        const cv = await this.repo.findByName(cvName, userId);
        return cv ? this.mapper.toResponseDto(cv) : null;
    }


    async update(id: string, userId: string, updateCvDto: UpdateCvDto): Promise<CvResponseDto> {
        const updatedCv = await this.repo.update(id, userId, updateCvDto);
        return this.mapper.toResponseDto(updatedCv);
    }

    async remove(id: string, userId: string): Promise<{ message: string }> {
        await this.repo.remove(id, userId);
        return { message: 'CV supprimé avec succès' };
    }


}
