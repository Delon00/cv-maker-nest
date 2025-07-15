import { Module } from '@nestjs/common';
import { UtilsService } from './shared.service';
import { PrismaModule } from '../modules/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [UtilsService],
    exports: [UtilsService],
})
export class UtilsModule {}
