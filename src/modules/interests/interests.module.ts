import { Module } from '@nestjs/common';
import { InterestsController } from './interests.controller';
import { InterestsService } from './interests.service';
import { InterestRepository } from './interest.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InterestsController],
  providers: [InterestsService,InterestRepository]
})
export class InterestsModule {}
