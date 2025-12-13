import { EmailService } from '@modules/email/email.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersMailer {
  constructor(
    private readonly emailService: EmailService,
  ) {}

  async notifyUserCreated(data: {name: string, email: string, password: string}) {
    try {
      await this.emailService.sendEmail({
        context: data,
        subject: "Bem vindo ao Gerenciamento AcheiMorumbi!",
        template: 'users/user-created',
        to: data.email,
      });
    } catch (error) {
      console.log({error});
    }
  }
}
