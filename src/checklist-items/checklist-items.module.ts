import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChecklistItemsService } from './checklist-items.service';
import { ChecklistItemsController } from './checklist-items.controller';
import { ChecklistItemsRepository } from './checklist-items.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { UsersModule } from '@modules/users/users.module';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';
import { UserEventsModule } from '@modules/user-events/user-events.module';

@Module({
  imports: [
    PrismaModule,
    PermissionsModule,
    UsersModule,
    UserEventsModule,
  ],
  controllers: [ChecklistItemsController],
  providers: [ChecklistItemsService, ChecklistItemsRepository],
})
export class ChecklistItemsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserEventsMiddleware)
      .forRoutes(ChecklistItemsController);
  }
}
