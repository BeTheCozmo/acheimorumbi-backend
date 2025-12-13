import { forwardRef, Module } from '@nestjs/common';
import { UserEventsService } from './user-events.service';
import { UserEventsController } from './user-events.controller';
import { UserEventsMiddleware } from './user-events.middleware';
import { UserEventsRepository } from './user-events.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => PermissionsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [UserEventsController],
  providers: [UserEventsService, UserEventsMiddleware, UserEventsRepository],
  exports: [UserEventsService, UserEventsMiddleware],
})
export class UserEventsModule {}
