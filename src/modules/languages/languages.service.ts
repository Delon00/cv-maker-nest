import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguageDto, UpdateLanguageDto } from './language.dto';
import { LanguageRepository } from './language.repository';
import { LanguageMapper } from './language.mapper';

@Injectable()
export class LanguagesService {
    constructor(private readonly repo: LanguageRepository) {}

    async create(cvId: string, dto: CreateLanguageDto) {
        const language = await this.repo.create(cvId, dto);
        return LanguageMapper.toResponse(language);
    }

    async findAllByCv(cvId: string) {
        const languages = await this.repo.findAllByCv(cvId);
        return LanguageMapper.toResponseArray(languages);
    }

    async findOne(id: string, cvId: string) {
        const language = await this.repo.findOne(id, cvId);
        if (!language) throw new NotFoundException('Langue introuvable');
        return LanguageMapper.toResponse(language);
    }

    async update(id: string, cvId: string, dto: UpdateLanguageDto) {
        const existing = await this.repo.findOne(id, cvId);
        if (!existing) throw new NotFoundException('Langue introuvable');
        const updated = await this.repo.update(id, dto);
        return LanguageMapper.toResponse(updated);
    }

    async delete(id: string, cvId: string) {
        const existing = await this.repo.findOne(id, cvId);
        if (!existing) throw new NotFoundException('Langue introuvable');
        await this.repo.delete(id);
        return { message: 'Langue supprimée avec succès' };
    }
}
