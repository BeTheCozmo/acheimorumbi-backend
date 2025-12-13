import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { AuthGuard } from './auth.guard';
import { AuthMail } from './auth.mail';
import { EmailModule } from '@modules/email/email.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }
      }),
      inject: [ConfigService]
    }),
    RolesModule,
    PermissionsModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AuthMail],
  exports: [AuthService, JwtModule, AuthGuard]
})
export class AuthModule {}
