import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CvModule } from './modules/cv/cv.module';
import { TemplatesCvModule } from './modules/templates-cv/templates-cv.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CvController } from './modules/cv/cv.controller';
import { EducationModule } from './modules/education/education.module';

import { TemplatesController } from './modules/templates-cv/templates-cv.controller';
import { TemplatesService } from './modules/templates-cv/templates-cv.service';
import { UtilsService } from './shared/shared.service';
import { SkillsModule } from './modules/skills/skills.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [AuthModule, CvModule, TemplatesCvModule, UsersModule, PrismaModule, EducationModule, SkillsModule, ExperiencesModule, AdminModule],
  controllers: [AppController, CvController, TemplatesController],
  providers: [AppService, TemplatesService, UtilsService],
})
export class AppModule {}
