import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UsersModule } from '@modules/users/users.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { DocumentsRepository } from './documents.repository';
import { UserEventsMiddleware } from '@modules/user-events/user-events.middleware';
import { UserEventsModule } from '@modules/user-events/user-events.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PermissionsModule,
    UserEventsModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository],
})
export class DocumentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserEventsMiddleware)
      .forRoutes(DocumentsController);
  }
}
