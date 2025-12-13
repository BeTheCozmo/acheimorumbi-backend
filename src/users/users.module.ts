import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { CodeGeneratorModule } from '@modules/code-generator/code-generator.module';
import { UsersMailer } from './users.mailer';
import { EmailModule } from '@modules/email/email.module';
import { UserEventsModule } from '@modules/user-events/user-events.module';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';

@Module({
  imports: [
    RolesModule,
    PrismaModule,
    PermissionsModule,
    CodeGeneratorModule,
    EmailModule,
    UserEventsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersMailer],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserEventsMiddleware)
      .forRoutes(UsersController);
  }
}
