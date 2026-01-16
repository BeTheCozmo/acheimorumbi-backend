import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsController } from './configurations.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { UsersModule } from '@modules/users/users.module';
import { ConfigurationsRepository } from './configurations.repository';

@Module({
  imports: [
    PrismaModule,
    PermissionsModule,
    UsersModule,
  ],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService, ConfigurationsRepository],
  exports: [ConfigurationsService],
})
export class ConfigurationsModule {}
