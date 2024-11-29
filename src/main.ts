import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, //Aqui ele recusa e lança erro se o usuário passar algo que não esteja no DTO
      transform: true, //Aqui ele transforma os dados da requisição que estamos recebendo, Ex: um id no param vem como string, aqui ele transforma em number, também faz isso com o body
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
