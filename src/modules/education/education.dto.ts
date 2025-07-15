import { IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEducationDto {
    @IsString()
    @IsNotEmpty()
    cvId: string;

    @IsString()
    @IsNotEmpty()
    school: string;

    @IsString()
    @IsNotEmpty()
    degree: string;

    @IsOptional()
    @IsString()
    field?: string;

    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsNumber()
    gpa?: number;
}

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}

export class EducationResponseDto {
    id: string;
    cvId: string;
    school: string;
    degree: string;
    field?: string;
    startDate: Date;
    endDate?: Date;
    gpa?: number;
}
