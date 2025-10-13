import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseUpperTrimePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value === 'string') {
            return value.trim().toUpperCase(); //Elimina los espacios y lo pasa a mayúsculas
        }
        if(typeof value === 'number' && value !== null) {
            throw new BadRequestException('El valor tiene que ser string');
        }
        return value; //Si no es string, lo devuelve tal cual
    }
}