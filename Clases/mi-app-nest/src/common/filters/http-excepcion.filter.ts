import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter { //Va a implementar las excepciones originales de Nest
    //Capturamos el error (exception) y el contexto (host) de dónde viene el error
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();        // Instancia de la petición
        const response = ctx.getResponse();     // Respuesta del error
        const request = ctx.getRequest();       // Petición que ha generado el error

        //Si la excepción es una HttpException, obtengo su status, si no, es un error 500
        const status = exception instanceof HttpException //Si es mi excepción personalizada
            ? exception.getStatus() //Mi excepción personalizada
            : HttpStatus.INTERNAL_SERVER_ERROR; //Excepción de nest
        
        //Si la excepción es una HttpException, obtengo su mensaje, si no, devuelvo la excepción tal cual
        const message = exception instanceof HttpException
            ? exception.getResponse()
            : exception;
        
        //Devuelvo un JSON con la información del error
        response.status(status).json({
            success: false,
            statusCode: status, 
            path: request.url, //Ruta donde se ha producido el error
            timeStamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
            message: message
        })
    }
}