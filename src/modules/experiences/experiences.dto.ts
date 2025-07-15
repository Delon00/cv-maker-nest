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

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}

export class ExperienceResponseDto {
    id: string;
    cvId: string;
    company: string;
    position: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
}
