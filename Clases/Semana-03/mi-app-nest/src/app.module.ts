import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; //Importamos el módulo de configuración
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

//El módulo raíz. Él va a agrupar todos los imports todos los controladores y todos los proveedores.
//@Module Es un decorador que define que esta clase es un módulo
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //Cargar las variables de entorno de forma global como el puerto 4000
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
