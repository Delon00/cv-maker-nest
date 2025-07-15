import { IsString, IsOptional } from 'class-validator';

export class CreateTemplateDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    previewUrl?: string;
}

import { PartialType } from '@nestjs/mapped-types';

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {}
