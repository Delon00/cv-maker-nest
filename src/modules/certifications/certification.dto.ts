import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CertificationResponseDto {
    id: string;
    cvId: string;
    title: string;
    institution?: string;
    date?: Date;
}

export class CreateCertificationDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    institution?: string;

    @IsOptional()
    @IsDateString()
    date?: Date;
}

export class UpdateCertificationDto extends PartialType(CreateCertificationDto) {}
