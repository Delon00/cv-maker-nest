import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { EducationRepository } from './education.repository';


@Module({
  imports: [PrismaModule],
  providers: [EducationService, EducationRepository],
  controllers: [EducationController]
})
export class EducationModule {}
