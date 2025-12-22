import { Module } from '@nestjs/common';
import { ForgotAccessService } from './forgot-access.service';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ForgotAccessRepository } from './forgot-access.repository';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [],
  providers: [ForgotAccessService, ForgotAccessRepository],
  exports: [ForgotAccessService],
})
export class ForgotAccessModule {}
