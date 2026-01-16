import { Module } from '@nestjs/common';
import { WitnessesService } from './witnesses.service';
import { WitnessesController } from './witnesses.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { WitnessesRepository } from './witnesses.repository';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PermissionsModule,
  ],
  controllers: [WitnessesController],
  providers: [WitnessesService, WitnessesRepository],
})
export class WitnessesModule {}
