import { Certification } from '@prisma/client';
import { CertificationResponseDto } from './certification.dto';

export class CertificationMapper {
    static toDto(cert: Certification): CertificationResponseDto {
        return {
            id: cert.id,
            cvId: cert.cvId,
            title: cert.title,
            institution: cert.institution ?? undefined,
            date: cert.date ?? undefined,
        };
    }
}
