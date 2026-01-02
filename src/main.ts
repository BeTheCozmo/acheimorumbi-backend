import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { readFileSync } from 'fs';
import helmet from 'helmet';
import { AppModule } from './app.module';
import asciify from "asciify";
import * as path from 'path';

async function bootstrap() {
  let app: INestApplication;

  if (process.env.ACTIVATE_SSL_CERTIFICATE === 'YES') {
    app = await NestFactory.create(AppModule, {
      cors: { origin: '*' },
      httpsOptions: {
        key: readFileSync(process.env.SSL_KEY, 'utf8'),
        cert: readFileSync(process.env.SSL_CERT, 'utf8'),
        ca: readFileSync(process.env.SSL_CA, 'utf8'),
      },
    });
    
    app.use(helmet());
    app.use(compression());
  } else {
    app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  }

  const config = new DocumentBuilder()
    .setTitle('Documentação da API AcheiMorumbi Contratos.')
    .setDescription('Essa API foi construída usando NestJS na versão 10.0')
    .setVersion('1.0')
    .addServer(`${process.env.HOST}:${process.env.PORT}`, 'Testes locais.')
    .addServer(`${process.env.NGROK}`, 'Testes de integrações.')
    .addBearerAuth()
    .build();

  const options: SwaggerCustomOptions = { customCss: readFileSync(path.resolve('.swagger.theme.css'), 'utf8') };
  const document = SwaggerModule.createDocument(app, config, {});
  if (process.env.ACTIVATE_SWAGGER === 'YES') SwaggerModule.setup('swagger', app, document, options);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  app.enableCors();

  await app.listen(process.env.PORT || 3070, async () => {
    asciify("Achei Morumbi", {font: 'larry3d'}, (err, result) => {
      console.log();
      console.log(result || err);
      console.log(`Server running at port: ${process.env.PORT}`);
    });
  });
}
bootstrap();
