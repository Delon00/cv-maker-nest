import { Skill } from '@prisma/client';
import { SkillResponseDto } from './skills.dto';

export class SkillMapper {
    static toResponseDto(skill: Skill): SkillResponseDto {
        return {
        id: skill.id,
        cvId: skill.cvId,
        name: skill.name,
        };
    }

    static toResponseDtoList(skills: Skill[]): SkillResponseDto[] {
        return skills.map(this.toResponseDto);
    }
}
