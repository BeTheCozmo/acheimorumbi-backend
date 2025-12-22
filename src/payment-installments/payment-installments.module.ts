import { Module } from '@nestjs/common';
import { PaymentInstallmentsService } from './payment-installments.service';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PaymentInstallmentsRepository } from './payment-installments.repository';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [],
  providers: [PaymentInstallmentsService, PaymentInstallmentsRepository],
  exports: [PaymentInstallmentsService],
})
export class PaymentInstallmentsModule {}
