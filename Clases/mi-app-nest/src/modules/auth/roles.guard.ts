import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

// Se ejecuta constantemente
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {} //Me permite crear el decorador

    //Lógica que ejecutará el guardián
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(), // Método
            context.getClass(), // Clase
        ])

        if (!requiredRoles) return true; // Si no hay roles requeridos, cualquiera puede acceder

        const { user } = context.switchToHttp().getRequest(); // Obtenemos el usuario de la petición

        if (!user) throw new ForbiddenException('Usuario no autenticado'); // Si no hay usuario, no puede acceder

        //Si el rol requerido que le paso por el usuario no está en los roles permitidos, lanzo un error
        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Su rol no tiene permisos para acceder a esta ruta')
        }

        return true; // Si todo está bien, puede acceder
    }
}