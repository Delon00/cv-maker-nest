import { IsString, IsOptional, IsInt, IsJSON, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

/**
 * DTO pour créer un CV
 */
export class CreateCvDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsString()
    templateId: string;

    @IsJSON()
    data: any;
}

/**
 * DTO pour mettre à jour un CV
 */
export class UpdateCvDto extends PartialType(CreateCvDto) {}


/**
 * DTO pour créer une expérience liée au CV
 */
export class CreateExperienceDto {
    @IsString()
    company: string;

    @IsString()
    position: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}

/**
 * DTO pour mettre à jour une expérience
 */
export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}

/**
 * DTO pour créer une compétence liée au CV
 */
export class CreateSkillDto {
    @IsString()
    name: string;
}

/**
 * DTO pour mettre à jour une compétence
 */
export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
