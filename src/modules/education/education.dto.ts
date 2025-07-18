import { IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEducationDto {
    @IsString()
    @IsNotEmpty()
    cvId: string;

    @IsString()
    @IsNotEmpty()
    school: string;


    @IsOptional()
    @IsString()
    location?: string;
    
    @IsOptional()
    @IsString()
    field?: string;

    @IsDateString()
    startYear: string;

    @IsOptional()
    @IsDateString()
    endYear?: string;

}

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}

export class EducationResponseDto {
    id: string;
    cvId: string;
    school?: string;
    location?:string
    field?: string;
    startYear?: string;
    endYear?: string;
}
