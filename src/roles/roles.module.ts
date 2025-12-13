import { All, forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UserEventsModule } from '@modules/user-events/user-events.module';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';

@Module({
  imports: [
    forwardRef(() => PermissionsModule),
    forwardRef(() => UsersModule),
    PrismaModule,
    UserEventsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  exports: [RolesService],
})
export class RolesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserEventsMiddleware)
      .forRoutes(RolesController);
  }
}
