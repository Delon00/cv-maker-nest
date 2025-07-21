import { Interest } from '@prisma/client';
import { InterestResponseDto } from './interest.dto';

export class InterestMapper {
    static toDto(interest: Interest): InterestResponseDto {
        return {
        id: interest.id,
        cvId: interest.cvId,
        name_interest: interest.name_interest,
        };
    }
}
