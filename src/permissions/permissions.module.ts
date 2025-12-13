import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionsRepository } from './permissions.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { PermissionsGuard } from './permissions.guard';
import PermissionsValidator from './validator/permissions.validator';
import { PermissionsTokenizer } from './validator/permissions.tokenizer';
import { PermissionsEvaluator } from './validator/permissions.evaluator';
import { UserEventsModule } from '@modules/user-events/user-events.module';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule),
    forwardRef(() => UserEventsModule),
  ],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    PermissionsRepository,
    PermissionsGuard,
    PermissionsValidator,
    PermissionsTokenizer,
    PermissionsEvaluator,
  ],
  exports: [PermissionsService, PermissionsGuard, PermissionsValidator, PermissionsEvaluator],
})
export class PermissionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(UserEventsMiddleware)
    .forRoutes(PermissionsController);
  }
}
