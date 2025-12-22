import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailConfig } from './interfaces/email-config.interface';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EmailService,
      useFactory: (configService: ConfigService) => {
        // Cria a configuração a partir das variáveis de ambiente
        // Isso permite configurar o serviço de email de forma flexível
        const emailConfig: EmailConfig = {
          host: configService.get<string>('SMTP_HOST', 'smtp.gmail.com'),
          port: configService.get<number>('SMTP_PORT', 587),
          secure: configService.get<boolean>('SMTP_SECURE', false),
          auth: {
            user: configService.get<string>('SMTP_USERNAME', ''),
            pass: configService.get<string>('SMTP_PASSWORD', ''),
          },
        };
        // DEBUG: Verificar se a senha está sendo lida corretamente
        return new EmailService(emailConfig);
      },
      inject: [ConfigService],
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
