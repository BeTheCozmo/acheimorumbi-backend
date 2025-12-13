import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { SendEmailDto } from './dto/send-email.dto';
import type { EmailConfig } from './interfaces/email-config.interface';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);
  private templatesCache: Map<string, handlebars.TemplateDelegate> = new Map();

  constructor(private readonly emailConfig: EmailConfig) {
    // Cria o transporter do nodemailer com a configuração fornecida
    // O transporter é o objeto responsável por enviar os emails
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
    });

    // Registra helpers customizados do Handlebars
    // Helpers são funções auxiliares que podem ser usadas nos templates
    this.registerHandlebarsHelpers();
  }

  /**
   * Registra helpers customizados para uso nos templates Handlebars
   * Helpers permitem lógica adicional dentro dos templates
   */
  private registerHandlebarsHelpers(): void {
    // Helper para formatar datas
    handlebars.registerHelper('formatDate', (date: Date) => {
      return new Date(date).toLocaleDateString('pt-BR');
    });

    // Helper para comparação
    handlebars.registerHelper('eq', (a: any, b: any) => a === b);

    // Helper para uppercase
    handlebars.registerHelper('uppercase', (str: string) => str.toUpperCase());
  }

  /**
   * Carrega e compila um template Handlebars
   * Usa cache para evitar recompilar templates já carregados
   * 
   * @param templateName - Nome do arquivo do template (sem extensão)
   * @returns Template compilado
   */
  private async loadTemplate(templateName: string): Promise<handlebars.TemplateDelegate> {
    // Verifica se o template já está em cache
    if (this.templatesCache.has(templateName)) {
      return this.templatesCache.get(templateName)!;
    }

    // Define o caminho do template
    // Os templates devem estar na pasta src/email/templates
    const templatePath = path.join(
      process.cwd(),
      'src',
      'email',
      'templates',
      `${templateName}.hbs`
    );

    try {
      // Lê o arquivo do template
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      
      // Compila o template com Handlebars
      const template = handlebars.compile(templateSource);
      
      // Armazena no cache para uso futuro
      this.templatesCache.set(templateName, template);
      
      return template;
    } catch (error) {
      this.logger.error(`Erro ao carregar template ${templateName}:`, error);
      throw new Error(`Template ${templateName} não encontrado`);
    }
  }

  /**
   * Envia um email usando template Handlebars
   * 
   * @param sendEmailDto - Dados do email a ser enviado
   * @returns Promise com informações do envio
   */
  async sendEmail(sendEmailDto: SendEmailDto): Promise<any> {
    const { to, subject, template, context, cc, bcc, attachments } = sendEmailDto;

    try {
      // Carrega e compila o template
      const compiledTemplate = await this.loadTemplate(template);
      
      // Gera o HTML final substituindo as variáveis do template
      // O context contém todas as variáveis que serão substituídas
      const html = compiledTemplate(context);

      // Configura as opções do email
      const mailOptions = {
        from: this.emailConfig.auth.user,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : undefined,
        bcc: bcc ? (Array.isArray(bcc) ? bcc.join(', ') : bcc) : undefined,
        attachments,
      };

      // Envia o email
      const info = await this.transporter.sendMail(mailOptions);
      
      this.logger.log(`Email enviado com sucesso para ${to}. ID: ${info.messageId}`);
      
      return info;
    } catch (error) {
      this.logger.error('Erro ao enviar email:', error);
      throw error;
    }
  }

  /**
   * Envia múltiplos emails em lote
   * Útil para newsletters ou notificações em massa
   * 
   * @param emails - Array de emails a serem enviados
   */
  async sendBulkEmails(emails: SendEmailDto[]): Promise<any[]> {
    // Usa Promise.all para enviar todos os emails em paralelo
    // Isso é mais eficiente do que enviar um por vez
    return Promise.all(emails.map(email => this.sendEmail(email)));
  }

  /**
   * Verifica se a conexão com o servidor SMTP está funcionando
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('Conexão com servidor SMTP verificada com sucesso');
      return true;
    } catch (error) {
      this.logger.error('Erro ao verificar conexão SMTP:', error);
      return false;
    }
  }
}
