import { Education } from '@prisma/client';
import { EducationResponseDto } from './education.dto';

export class EducationMapper {
    static toResponseDto(education: Education): EducationResponseDto {
        return {
        id: education.id,
        cvId: education.cvId,
        school: education.school,
        degree: education.degree,
        field: education.field ?? undefined,
        startDate: education.startDate,
        endDate: education.endDate ?? undefined,

        };
    }
}
