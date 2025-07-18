import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateExperienceDto {
    @IsString()
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
    startMonth: string;

    @IsOptional()
    @IsString()
    startYear: string;


    @IsOptional()
    @IsString()
    endMonth: string;

    @IsOptional()
    @IsDateString()
    endYear?: string;
}

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}

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
