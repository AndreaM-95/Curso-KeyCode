import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-excepcion.filter';

//Este es nuestro punto de entrada a la aplicacion
//Este archivo es el que crea el proyecto y lo despliega en el puerto 4000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuración de swagger
  const configDoc = new DocumentBuilder()
    .setTitle('API MujeresDigitales2025')
    .setDescription('Documentación de la API desarrollada en NestJS para MujeresDigitales2025')
    .setVersion('2.5')
    .addBearerAuth() //Porque nosotros usamos autenticación con token
    .build();

  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api/docs', app, document)
  
  app.useGlobalFilters(new AllExceptionsFilter()) //Habilitar el filtro global de excepciones

  //Habilitar la validación global y usará mis validaciones también
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true, //Nos permite que nuestros pipes transformen los datos
    transformOptions: { enableImplicitConversion: true } //Nos permite hacer conversiones implícitas (como de string a number con ParseIntPipe)
  }))
  
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`App running on: http://localhost:${port}`);
}
bootstrap();
