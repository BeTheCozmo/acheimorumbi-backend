import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import * as joi from 'joi';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { PartiesModule } from './parties/parties.module';
import { PropertiesModule } from './properties/properties.module';
import { ContractsModule } from './contracts/contracts.module';
import { DocumentsModule } from './documents/documents.module';
import { CodeGeneratorModule } from './code-generator/code-generator.module';
import { ChecklistTitlesModule } from './checklist-titles/checklist-titles.module';
import { ChecklistItemsModule } from './checklist-items/checklist-items.module';
import { PartyFormsModule } from './party-forms/party-forms.module';
import { UserEventsModule } from './user-events/user-events.module';
import { ContractGeneratorModule } from './contract-generator/contract-generator.module';
import { PaymentInstallmentsModule } from './payment-installments/payment-installments.module';
import { ForgotAccessModule } from './forgot-access/forgot-access.module';
import { WitnessesModule } from './witnesses/witnesses.module';
import { ConfigurationsModule } from './configurations/configurations.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: joi.object({
        BCRYPT_SALT_ROUNDS: joi.number().default(13),
        PORT: joi.number().default(3070),
        JWT_SECRET: joi.string().required(),
        SMTP_HOST: joi.string().required(),
        SMTP_PORT: joi.number().required(),
        SMTP_SECURE: joi.boolean().required(),
        SMTP_USERNAME: joi.string().required(),
        SMTP_PASSWORD: joi.string().required(),
      }),
    }),
    PrismaModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
    AuthModule,
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      isGlobal: true,
      fileSystemStoragePath: './uploads',
    }),
    PartiesModule,
    PropertiesModule,
    ContractsModule,
    DocumentsModule,
    CodeGeneratorModule,
    ChecklistTitlesModule,
    ChecklistItemsModule,
    PartyFormsModule,
    UserEventsModule,
    ContractGeneratorModule,
    PaymentInstallmentsModule,
    ForgotAccessModule,
    WitnessesModule,
    ConfigurationsModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
