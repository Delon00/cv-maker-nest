import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class InterestResponseDto {
    id: string;
    cvId: string;
    name_interest: string;
}

export class CreateInterestDto {
    @IsNotEmpty()
    @IsString()
    name_interest: string;
}

export class UpdateInterestDto extends PartialType(CreateInterestDto) {}
