import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument( app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map(error => { return { property: error.property, constraints: error.constraints } });
      return new BadRequestException({
        alert: "The following errors were made in the request:",
        errors: cleanErrors
      })
    },
  }));
  
  app.use(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
