import { IsNotEmpty, IsOptional, IsString, IsEmail, ValidateNested, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ExperienceResponseDto } from '../experiences/experiences.dto';
import { EducationResponseDto } from '../education/education.dto';
import { SkillResponseDto } from '../skills/skills.dto';
import { LanguageResponseDto } from '../languages/language.dto';
import { InterestResponseDto } from '../interests/interest.dto';
import { CertificationResponseDto } from '../certifications/certification.dto';
import { Type } from 'class-transformer';

/**
 * DTO de réponse pour un CV
 */
export class CvResponseDto {
    id: string;
    cvName:string;
    profile?: string;
    linkedIn?: string;
    website?: string;
    templateId: string;

    lastName?: string;
    firstName?: string;
    email?: string;
    phone?: string;
    resume?: string;
    city?: string;

    createdAt: Date;
    updatedAt: Date;

    educations?: EducationResponseDto[];
    languages?: LanguageResponseDto[];
    experiences?: ExperienceResponseDto[];
    interests?: InterestResponseDto[];
    certifications?: CertificationResponseDto[];
    skills?: SkillResponseDto[];
}

/**
 * DTO pour créer un CV
 */
    export class CreateCvDto {

    @IsNotEmpty()
    @IsString()
    cvName: string;    

    @IsOptional()
    @IsString()
    profile?: string;

    @IsOptional()
    @IsString()
    linkedIn?: string;

    @IsOptional()
    @IsString()
    website?: string;

    @IsNotEmpty()
    @IsString()
    templateId: string;


    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    resume?: string;

    @IsOptional()
    @IsString()
    city?: string;


    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExperienceResponseDto)
    experiences?: ExperienceResponseDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EducationResponseDto)
    educations?: EducationResponseDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LanguageResponseDto)
    languages?: LanguageResponseDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CertificationResponseDto)
    certifications?: CertificationResponseDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InterestResponseDto)
    interests?: InterestResponseDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() =>SkillResponseDto)
    skills?:SkillResponseDto[];
}

/**
 * DTO pour mettre à jour un CV (tous les champs optionnels)
 */
export class UpdateCvDto extends PartialType(CreateCvDto) {}
