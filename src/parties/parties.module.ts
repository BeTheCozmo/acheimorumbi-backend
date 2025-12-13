import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { UsersModule } from '@modules/users/users.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { PartiesRepository } from './parties.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ContractsModule } from '@modules/contracts/contracts.module';
import { UserEventsModule } from '@modules/user-events/user-events.module';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';
import { PartiesSubmissionController } from './parties-submission.controller';

@Module({
  imports: [
    UsersModule,
    PermissionsModule,
    UserEventsModule,
    PrismaModule,
    ContractsModule,
  ],
  controllers: [PartiesController, PartiesSubmissionController],
  providers: [PartiesService, PartiesRepository],
  exports: [PartiesService],
})
export class PartiesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserEventsMiddleware)
      .forRoutes(PartiesController);
  }
}
