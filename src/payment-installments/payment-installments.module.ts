import { Module } from '@nestjs/common';
import { PaymentInstallmentsService } from './payment-installments.service';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PaymentInstallmentsRepository } from './payment-installments.repository';
import { ConfigurationsModule } from '@modules/configurations/configurations.module';

@Module({
  imports: [
    PrismaModule,
    ConfigurationsModule,
  ],
  controllers: [],
  providers: [PaymentInstallmentsService, PaymentInstallmentsRepository],
  exports: [PaymentInstallmentsService],
})
export class PaymentInstallmentsModule {}
