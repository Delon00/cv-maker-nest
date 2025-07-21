import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CvRepository } from './cv.repository';
import { CvMapper } from './cv.mapper';


@Module({
  imports: [PrismaModule],
  controllers: [CvController],
  providers: [CvService, CvRepository, CvMapper],
  exports: [CvService],
})
export class CvModule {}
