import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSkillDto {
    @IsString()
    @IsNotEmpty()
    cvId: string;

    @IsString()
    @IsNotEmpty()
    name: string;
    }

    export class UpdateSkillDto extends PartialType(CreateSkillDto) {}

    export class SkillResponseDto {
    id: string;
    cvId: string;
    name: string;
}
