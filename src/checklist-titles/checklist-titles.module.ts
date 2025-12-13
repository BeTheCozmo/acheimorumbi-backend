import { Module } from '@nestjs/common';
import { ChecklistTitlesService } from './checklist-titles.service';
import { ChecklistTitlesRepository } from './checklist-titles.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { UsersModule } from '@modules/users/users.module';
import { UserEventsModule } from '@modules/user-events/user-events.module';

@Module({
  imports: [
    PrismaModule,
    PermissionsModule,
    UsersModule,
    UserEventsModule,
  ],
  controllers: [],
  providers: [ChecklistTitlesService, ChecklistTitlesRepository],
  exports: [ChecklistTitlesService]
})
export class ChecklistTitlesModule {}
