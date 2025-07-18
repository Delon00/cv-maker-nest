import { Education } from '@prisma/client';
import { EducationResponseDto } from './education.dto';

export class EducationMapper {
    static toResponseDto(education: Education): EducationResponseDto {
        return {
            id: education.id,
            cvId: education.cvId,
            school: education.school ?? undefined,
            location: education.location ?? undefined,
            field: education.field ?? undefined,
            startYear: education.startYear ?? undefined,
            endYear: education.endYear ?? undefined,
        };
    }
}
