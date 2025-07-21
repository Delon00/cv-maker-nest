import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

/**
 * DTO de réponse pour une expérience professionnelle
 */
export class ExperienceResponseDto {
    id: string;
    cvId: string;
    jobTitle?: string;
    company?: string;
    location?: string;
    description?: string;
    startMonth?: string;
    startYear?: string;
    endMonth?: string;
    endYear?: string;
}

/**
 * DTO pour créer une expérience professionnelle
 */
export class CreateExperienceDto {
    @IsUUID()
    @IsNotEmpty()
    cvId: string;

    @IsString()
    @IsNotEmpty()
    company: string;

    @IsString()
    @IsNotEmpty()
    jobTitle: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    startMonth?: string;

    @IsOptional()
    @IsString()
    startYear?: string;

    @IsOptional()
    @IsString()
    endMonth?: string;

    @IsOptional()
    @IsString() 
    endYear?: string;
}

/**
 * DTO pour mettre à jour une expérience
 */
export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}
