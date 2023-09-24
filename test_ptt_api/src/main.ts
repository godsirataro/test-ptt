/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

async function bootstrap() {
  // let envFile;

  // switch (process.env.NODE_ENV) {
  //   case 'development':
  //     envFile = '.env.development';
  //     break;
  //   case 'production':
  //     envFile = '.env.production';
  //     break;
  //   default:
  //     envFile = '.env';
  //     break;
  // }

  dotenv.config({ path: '.env' });

  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.setGlobalPrefix(process.env.SWAGGER_PREFIX);

  const options = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESC)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_PREFIX, app, document);

  await app.listen(process.env.PORT, () => {
    // eslint-disable-next-line prettier/prettier
    console.log(
      'app listening on url http://localhost:' + process.env.PORT + '/api'
    );
  });
}
// eslint-disable-next-line prettier/prettier
bootstrap();