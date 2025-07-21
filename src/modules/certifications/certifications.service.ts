import { Injectable, NotFoundException } from '@nestjs/common';
import { CertificationRepository } from './certification.repository';
import { CreateCertificationDto, UpdateCertificationDto } from './certification.dto';
import { CertificationMapper } from './certification.mapper';

@Injectable()
export class CertificationsService {
    constructor(private repo: CertificationRepository) {}

    async create(cvId: string, dto: CreateCertificationDto) {
        const cert = await this.repo.create(cvId, dto);
        return CertificationMapper.toDto(cert);
    }

    async findAll(cvId: string) {
        const list = await this.repo.findAll(cvId);
        return list.map(CertificationMapper.toDto);
    }

    async update(id: string, dto: UpdateCertificationDto) {
        const existing = await this.repo.findOne(id);
        if (!existing) throw new NotFoundException('Certification not found');
        const updated = await this.repo.update(id, dto);
        return CertificationMapper.toDto(updated);
    }

    async remove(id: string) {
        await this.repo.delete(id);
    }
}
