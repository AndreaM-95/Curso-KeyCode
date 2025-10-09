import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from 'src/entities/user.entity'; //Importamos la entidad User

//En imports vamos a decir que mi servicio de usuarios va a tener acceso a la tabla de usuarios
@Module({
  imports: [TypeOrmModule.forFeature([User])], //Importamos la entidad User
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
