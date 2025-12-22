import { EmailService } from '@modules/email/email.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthMail {
  @Inject() emailService: EmailService;

  async notifyUserCreated(data: {name: string, email: string}) {
    try {
      await this.emailService.sendEmail({
        context: data,
        subject: "Bem vindo ao Gerenciamento AcheiMorumbi!",
        template: 'auth/user-created',
        to: data.email,
      });
    } catch (error) {
      console.log({error});
    }
  }

  async notifyForgotPassword(data: {name: string, email: string, code: string}) {
    try { 
      await this.emailService.sendEmail({
        context: data,
        subject: "Recuperação de senha",
        template: 'auth/forgot-password',
        to: data.email,
      });
    } catch (error) {
      console.log({error});
    }
  }
}