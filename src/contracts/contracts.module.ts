import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { UsersModule } from '@modules/users/users.module';
import { ContractsRepository } from './contracts.repository';
import { CodeGeneratorModule } from '@modules/code-generator/code-generator.module';
import { ChecklistTitlesModule } from '@modules/checklist-titles/checklist-titles.module';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';
import { UserEventsModule } from '@modules/user-events/user-events.module';
import { PropertiesModule } from '@modules/properties/properties.module';
import { PartiesModule } from '@modules/parties/parties.module';
import { ContractContextService } from './contract-context.service';
import { ContractGeneratorModule } from '@modules/contract-generator/contract-generator.module';
import { PaymentInstallmentsModule } from '@modules/payment-installments/payment-installments.module';

@Module({
  imports: [
    PrismaModule,
    PermissionsModule,
    UsersModule,
    CodeGeneratorModule,
    ChecklistTitlesModule,
    UserEventsModule,
    PropertiesModule,
    forwardRef(() => PartiesModule),
    ContractGeneratorModule,
    PaymentInstallmentsModule,
  ],
  controllers: [ContractsController],
  providers: [ContractsService, ContractsRepository, ContractContextService],
  exports: [ContractsService]
})
export class ContractsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserEventsMiddleware)
      .forRoutes(ContractsController);
  }
}
