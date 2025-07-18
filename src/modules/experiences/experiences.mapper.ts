import { Experience } from '@prisma/client';
import { ExperienceResponseDto } from './experiences.dto';

export class ExperienceMapper {
    static toResponseDto(exp: Experience): ExperienceResponseDto {
        return {
            id: exp.id,
            cvId: exp.cvId,
            company: exp.company ?? undefined,
            location: exp.location ?? undefined,
            description: exp.description ?? undefined,
            startMonth: exp.startMonth ?? undefined,
            endMonth: exp.endMonth ?? undefined,
            endYear: exp.endYear ?? undefined,
        };
    }

    static toResponseDtoList(list: Experience[]): ExperienceResponseDto[] {
        return list.map(this.toResponseDto);
    }
}
