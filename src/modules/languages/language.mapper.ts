import { Language } from '@prisma/client';
import { LanguageResponseDto } from './language.dto';

export class LanguageMapper {
    static toResponse(language: Language): LanguageResponseDto {
        return {
        id: language.id,
        cvId: language.cvId,
        name: language.name,
        level: language.level ?? undefined,
        };
    }

    static toResponseArray(languages: Language[]): LanguageResponseDto[] {
        return languages.map(this.toResponse);
    }
}
