import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  //Inyectamos el servicio de usuarios
  constructor(private readonly userService: UsersService) {}

  login(data: LoginDTO) {
    //Me traigo todos los usuarios
    const users = this.userService.findAll();

    //Busco el usuario que coincida con el email y password que tengo en el DTO
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );

    //Si no existe el usuario o la contraseña es incorrecta
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    //Si todo está bien, retorno el usuario (sin la contraseña) y un token falso
    //El token es solo un string que contiene el id del usuario y la fecha actual
    //En una aplicación real, aquí generaría un JWT o algún otro tipo de token
    return {
      user: { id: user.id, name: user.name, email: user.email },
      accessToken: `fake-token-${user.id}-${Date.now()}`,
    };
  }
}
