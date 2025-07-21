import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

/**
 * DTO pour la création d'une langue dans un CV
 */
export class CreateLanguageDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    level?: string;
}

/**
 * DTO pour la mise à jour d'une langue
 */
export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {}

/**
 * DTO de réponse pour une langue (ex: lors de la récupération d'un CV)
 */
export class LanguageResponseDto {
    id: string;
    cvId: string;
    name: string;
    level?: string;
}
