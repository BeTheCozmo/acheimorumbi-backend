import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PartyFormsService } from './party-forms.service';
import { PartyFormsController } from './party-forms.controller';
import { PartyFormsRepository } from './party-forms.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { UsersModule } from '@modules/users/users.module';
import { ContractsModule } from '@modules/contracts/contracts.module';
import { UserEventsModule } from '@modules/user-events/user-events.module';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';

@Module({
  imports: [
    PermissionsModule,
    UsersModule,
    PrismaModule,
    ContractsModule,
    UserEventsModule,
  ],
  controllers: [PartyFormsController],
  providers: [PartyFormsService, PartyFormsRepository],
})
export class PartyFormsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserEventsMiddleware)
      .forRoutes(PartyFormsController);
  }
}
