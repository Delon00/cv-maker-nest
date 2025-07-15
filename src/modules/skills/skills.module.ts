import { Module } from '@nestjs/common';
import { SkillController } from './skills.controller';
import { SkillService } from './skills.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { SkillRepository } from './skills.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SkillController],
  providers: [SkillService,SkillRepository],
  exports: [SkillService],
})
export class SkillsModule {}
