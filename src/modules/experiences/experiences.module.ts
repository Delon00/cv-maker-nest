import { Module } from '@nestjs/common';
import { ExperienceController } from './experiences.controller';
import { ExperienceService } from './experiences.service';

import { PrismaModule } from '../prisma/prisma.module';
import { ExperienceRepository } from './experiences.repository';

@Module({
  controllers: [ExperienceController],
  imports: [PrismaModule],
  providers: [ExperienceService, ExperienceRepository]
})
export class ExperiencesModule {}
