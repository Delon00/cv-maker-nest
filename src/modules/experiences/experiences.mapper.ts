import { Experience } from '@prisma/client';
import { ExperienceResponseDto } from './experiences.dto';

export class ExperienceMapper {
    static toResponseDto(exp: Experience): ExperienceResponseDto {
        return {
        id: exp.id,
        cvId: exp.cvId,
        company: exp.company,
        position: exp.position,
        description: exp.description ?? undefined,
        startDate: exp.startDate,
        endDate: exp.endDate ?? undefined,
        };
    }

    static toResponseDtoList(list: Experience[]): ExperienceResponseDto[] {
        return list.map(this.toResponseDto);
    }
}
