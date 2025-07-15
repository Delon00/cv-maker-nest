import { Module } from '@nestjs/common';
import { TemplatesService } from './templates-cv.service';
import { TemplatesController } from './templates-cv.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TemplatesService],
  controllers: [TemplatesController]
})
export class TemplatesCvModule {}
