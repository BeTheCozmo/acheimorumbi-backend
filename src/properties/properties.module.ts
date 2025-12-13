import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { PropertiesRepository } from './properties.repository';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';
import { UserEventsModule } from '@modules/user-events/user-events.module';

@Module({
  imports: [
    PermissionsModule,
    UsersModule,
    PrismaModule,
    UserEventsModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, PropertiesRepository],
  exports: [PropertiesService],
})
export class PropertiesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserEventsMiddleware)
      .forRoutes(PropertiesController);
  }
}
